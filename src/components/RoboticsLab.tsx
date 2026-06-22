import { useState, useEffect, useRef } from 'react';
import { ROBOTICS_LAB_PROJECTS } from '../data';
import { ProjectData } from '../types';
import { audioSystem } from '../lib/AudioEngine';
import { Cpu, Activity, Layout, Eye, Play, Sliders, RefreshCw, Layers } from 'lucide-react';

export default function RoboticsLab() {
  const [projects] = useState(ROBOTICS_LAB_PROJECTS);
  const [activeProjId, setActiveProjId] = useState<string>('slam-robot');
  const telemetryCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // PID Slider States
  const [pVal, setPVal] = useState(1.4);
  const [iVal, setIVal] = useState(0.2);
  const [dVal, setDVal] = useState(0.85);

  // Eye Dilation slider
  const [eyeStimulus, setEyeStimulus] = useState(60);

  const activeProject = projects.find(p => p.id === activeProjId) || projects[0];

  // Render Telemetry Simulation loop
  useEffect(() => {
    const canvas = telemetryCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let sweepAngle = 0;
    const mapPoints: { x: number; y: number; age: number }[] = [];
    
    // Generate some static obstacles for SLAM Sweep map
    const staticObstacles: { x: number; y: number }[] = [];
    for (let angle = 0; angle < Math.PI * 2; angle += 0.4) {
      if (Math.sin(angle * 3) > 0.1) {
        const radius = 60 + Math.cos(angle * 5) * 15;
        staticObstacles.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
    }

    let timeStep = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      timeStep += 0.05;

      // Draw background cyber matrix grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render based on Telemetry type
      const type = activeProject.telemetrySource;

      if (type === 'slam-map') {
        // --- 1. LIDAR SWEEP RADAR ---
        sweepAngle += 0.02;

        // Draw circles index
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        ctx.stroke();

        // Draw cross lines
        ctx.beginPath();
        ctx.moveTo(cx - 90, cy); ctx.lineTo(cx + 90, cy);
        ctx.moveTo(cx, cy - 90); ctx.lineTo(cx, cy + 90);
        ctx.stroke();

        // Sweep beam
        const rx = cx + Math.cos(sweepAngle) * 90;
        const ry = cy + Math.sin(sweepAngle) * 90;
        
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(rx, ry);
        ctx.stroke();

        // Detect overlapping static obstacles
        staticObstacles.forEach(obs => {
          const obsAngle = Math.atan2(obs.y, obs.x);
          // Check sweep collision (normalize angles to positive values)
          const normSweep = (sweepAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          const normObs = (obsAngle + Math.PI * 2) % (Math.PI * 2);

          if (Math.abs(normSweep - normObs) < 0.05) {
            mapPoints.push({
              x: cx + obs.x,
              y: cy + obs.y,
              age: 1.0
            });
          }
        });

        // Draw mapped lidar obstacles points
        mapPoints.forEach((pt, idx) => {
          ctx.fillStyle = `rgba(34, 211, 238, ${pt.age})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();

          // Apply decay age
          pt.age -= 0.005;
        });

        // Clear extinct points
        for (let i = mapPoints.length - 1; i >= 0; i--) {
          if (mapPoints[i].age <= 0) mapPoints.splice(i, 1);
        }

        // Autonomous navigation rover indicator
        ctx.fillStyle = '#0891b2';
        ctx.beginPath();
        const rxOffset = Math.sin(timeStep * 0.4) * 8;
        const ryOffset = Math.cos(timeStep * 0.3) * 8;
        ctx.arc(cx + rxOffset, cy + ryOffset, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw label text
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.font = '10px monospace';
        ctx.fillText(`LIDAR RANGE: 1.2M`, 10, 20);
        ctx.fillText(`SAT QUANTITY: UNLOCK_OK`, 10, 35);

      } else if (type === 'pid-graph') {
        // --- 2. PID DAMPING GRAPH ---
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
        ctx.beginPath();
        ctx.moveTo(10, cy);
        ctx.lineTo(width - 10, cy);
        ctx.stroke();

        // Target flight line
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(10, cy - 30);
        ctx.lineTo(width - 10, cy - 30);
        ctx.stroke();
        ctx.setLineDash([]);

        // Calculate and draw dynamic stabilization damping curve
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        
        const frequencyScale = 0.08 - pVal * 0.015;
        const dampingFactor = 0.015 + dVal * 0.012;
        const baselineMultiplier = 60 * iVal;

        for (let x = 10; x < width - 10; x++) {
          const t = x - 10;
          // Standard second order system stabilization equation
          const y = (cy + baselineMultiplier) - Math.exp(-dampingFactor * t) * Math.cos(frequencyScale * t + timeStep) * 45 - 30;
          
          if (x === 10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.font = '10px monospace';
        ctx.fillText(`ATTITUDE FILTER_P: ${pVal}`, 15, 20);
        ctx.fillText(`DAMPING_D: ${dVal}`, 15, 35);
        ctx.fillText(`INTEGRAL_I: ${iVal}`, 15, 50);

      } else if (type === 'wheel-encoders') {
        // --- 3. DIFFERENTIAL ENCODERS WHEELS ---
        const leftSpd = 1.2 + Math.sin(timeStep * 0.5) * 0.5;
        const rightSpd = 1.2 + Math.cos(timeStep * 0.5) * 0.5;

        // Draw left wheel representation
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 50, cy - 40, 15, 80);
        // Spin spikes
        const leftSpikeY = cy + Math.sin(timeStep * leftSpd) * 35;
        ctx.beginPath();
        ctx.moveTo(cx - 50, leftSpikeY);
        ctx.lineTo(cx - 35, leftSpikeY);
        ctx.stroke();

        // Draw right wheel representation
        ctx.strokeRect(cx + 35, cy - 40, 15, 80);
        const rightSpikeY = cy + Math.sin(timeStep * rightSpd) * 35;
        ctx.beginPath();
        ctx.moveTo(cx + 35, rightSpikeY);
        ctx.lineTo(cx + 50, rightSpikeY);
        ctx.stroke();

        // Draw chassis connection lines
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cx - 35, cy);
        ctx.lineTo(cx + 35, cy);
        ctx.stroke();

        ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.font = '10px monospace';
        ctx.fillText(`LEFT_WHEEL_VEL: ${leftSpd.toFixed(2)} RAD/S`, 15, 20);
        ctx.fillText(`RIGHT_WHEEL_VEL: ${rightSpd.toFixed(2)} RAD/S`, 15, 35);

      } else if (type === 'iris-vision') {
        // --- 4. HUMAN OCULAR TRACKER FEED ---
        const pupilRadius = 10 + (eyeStimulus / 6);
        const outerRadius = 40;

        // Draw video frame bounds
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
        ctx.strokeRect(10, 10, width - 20, height - 20);

        // Core eye contour
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cx - 55, cy);
        ctx.quadraticCurveTo(cx, cy - 35, cx + 55, cy);
        ctx.quadraticCurveTo(cx, cy + 35, cx - 55, cy);
        ctx.stroke();

        // Iris
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.beginPath();
        ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pupil adjusting with user sliders
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(cx, cy, pupilRadius, 0, Math.PI * 2);
        ctx.fill();

        // Vision HUD target crosshairs
        ctx.strokeStyle = '#f43f5e';
        ctx.beginPath();
        ctx.drawCrosshair = (x: number, y: number, r: number) => {
          ctx.moveTo(x - r, y); ctx.lineTo(x + r, y);
          ctx.moveTo(x, y - r); ctx.lineTo(x, y + r);
        };
        ctx.drawCrosshair(cx, cy - 5, 8);
        ctx.stroke();

        ctx.fillStyle = 'rgba(34, 211, 238, 0.7)';
        ctx.font = '9px monospace';
        ctx.fillText(`PUPIL_CONTOUR_X: ${cx.toFixed(0)}`, 15, 25);
        ctx.fillText(`STIMULUS_LUX: ${eyeStimulus}%`, 15, 38);
        ctx.fillText(`TRACKING_STATE: LOCK_ON`, 15, 51);

      } else if (type === 'socket-ping') {
        // --- 5. WS SOCKETS PIN GRAPHER ---
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
        ctx.beginPath();
        ctx.moveTo(10, cy + 20);
        ctx.lineTo(width - 10, cy + 20);
        ctx.stroke();

        // Plot telemetry pins packet signals
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let x = 10; x < width - 10; x += 15) {
          const waveHeight = (Math.sin(x * 0.05 + timeStep) * (Math.cos(x * 0.01) * 30));
          ctx.lineTo(x, cy + waveHeight);
        }
        ctx.stroke();

        ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.font = '10px monospace';
        ctx.fillText(`PING STATS: 45ms AVERAGE`, 15, 20);
        ctx.fillText(`CONN STATUS: TRANSMITTING`, 15, 35);

      } else if (type === 'cad-vector') {
        // --- 6. PCB PATH VECTORS ROUTER ---
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(80, 20);
        ctx.lineTo(120, 60);
        ctx.lineTo(120, height - 30);
        ctx.stroke();

        ctx.strokeStyle = '#0891b2';
        ctx.beginPath();
        ctx.moveTo(50, height - 20);
        ctx.lineTo(140, height - 20);
        ctx.lineTo(180, height - 60);
        ctx.lineTo(180, 40);
        ctx.stroke();

        // Moving charge particles on traces
        const chargeProgress = (timeStep * 30) % 240;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(20 + chargeProgress, 20, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(5, 150, 105, 0.8)';
        ctx.font = '10px monospace';
        ctx.fillText(`DESIGNATOR: COMP-B4`, 15, 20);
        ctx.fillText(`IMPEDANCE: 50 OHM`, 15, 35);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeProjId, pVal, iVal, dVal, eyeStimulus]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="robotics-lab-main">
      {/* 2/4 - Interactive Telemetry visual workspace panel */}
      <div className="lg:col-span-2 bg-slate-900/80 border border-cyan-500/20 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-3 flex gap-2 pointer-events-none select-none text-[9px] font-mono text-cyan-500/30">
          <span>CO_PROC: RUNNING</span>
          <Activity className="w-3.5 h-3.5" />
        </div>

        <div className="space-y-4">
          <div className="border-b border-cyan-500/10 pb-3 flex flex-col">
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest font-bold flex items-center gap-1">
              <Play className="w-3 h-3 text-cyan-400" /> ACTIVE_TELEMETRY_STREAM_WORKSPACE
            </span>
            <h4 className="text-sm text-slate-100 font-mono font-medium mt-1">{activeProject.title}</h4>
          </div>

          <div className="relative bg-slate-950 border border-cyan-950 rounded-lg overflow-hidden h-[190px] flex items-center justify-center">
            {/* Direct Telemetry Canvas */}
            <canvas ref={telemetryCanvasRef} className="absolute inset-0 w-full h-full" />
          </div>

          {/* Custom interactive sub-dials based on specific telemetry selection */}
          {activeProject.telemetrySource === 'pid-graph' && (
            <div className="bg-slate-950/60 p-3.5 rounded border border-cyan-500/10 space-y-3">
              <span className="text-[10px] text-cyan-400 font-mono font-semibold uppercase flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" /> PID_FILTER_CALIBRATION_COEFFICIENTS:
              </span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Proportional Gain (Kp)</span>
                    <span className="text-cyan-400">{pVal.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="3" step="0.1" value={pVal} 
                    onChange={e => { audioSystem.tapClick(); setPVal(parseFloat(e.target.value)); }}
                    className="w-full accent-cyan-400" 
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Integral Gain (Ki)</span>
                    <span className="text-cyan-400">{iVal.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="1.5" step="0.05" value={iVal} 
                    onChange={e => { audioSystem.tapClick(); setIVal(parseFloat(e.target.value)); }}
                    className="w-full accent-cyan-400" 
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Derivative Gain (Kd)</span>
                    <span className="text-cyan-400">{dVal.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="2" step="0.05" value={dVal} 
                    onChange={e => { audioSystem.tapClick(); setDVal(parseFloat(e.target.value)); }}
                    className="w-full accent-cyan-400" 
                  />
                </div>
              </div>
            </div>
          )}

          {activeProject.telemetrySource === 'iris-vision' && (
            <div className="bg-slate-950/60 p-3 rounded border border-cyan-500/10 space-y-2">
              <span className="text-[10px] text-cyan-400 font-mono font-semibold uppercase block">
                SIMULATE LIGHT EXPOSURE STIMULUS:
              </span>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Intensity LUX index</span>
                  <span className="text-cyan-400">{eyeStimulus}%</span>
                </div>
                <input 
                  type="range" min="10" max="100" step="1" value={eyeStimulus} 
                  onChange={e => { audioSystem.tapClick(); setEyeStimulus(parseInt(e.target.value)); }}
                  className="w-full accent-cyan-400" 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2/4 - List of active project items and expander profiles */}
      <div className="lg:col-span-2 space-y-4">
        <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2 pl-1 select-none">
          <Layers className="w-4 h-4 text-cyan-400 animate-spin" /> SELECT LAB EXPERIMENT TO AUDIT:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((proj) => {
            const isActive = activeProjId === proj.id;
            
            return (
              <div
                key={proj.id}
                onClick={() => {
                  audioSystem.tapClick();
                  setActiveProjId(proj.id);
                }}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between h-[155px] ${
                  isActive
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] text-cyan-200'
                    : 'bg-slate-950/60 border-cyan-500/10 text-slate-400 hover:border-cyan-500/25 hover:text-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[8px] font-mono tracking-widest uppercase">
                    <span>{proj.category}</span>
                    <span className={`px-1 rounded border ${
                      proj.status === 'ONLINE' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/15' : 'text-cyan-400 border-cyan-500/30'
                    }`}>{proj.status}</span>
                  </div>
                  <h5 className="font-mono text-xs font-semibold tracking-tight leading-tight mt-1 text-slate-100">
                    {proj.title}
                  </h5>
                  <p className="text-[10px] leading-tight text-slate-400 font-sans line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-cyan-500/5">
                  {proj.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[8px] font-mono px-1 py-0.5 rounded bg-slate-950/60 border border-cyan-500/10 text-cyan-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
