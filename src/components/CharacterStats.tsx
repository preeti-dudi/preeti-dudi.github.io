import { useState } from 'react';
import { CHARACTER_STATS } from '../data';
import { audioSystem } from '../lib/AudioEngine';
import { Cpu, Award, TrendingUp, Zap, HelpCircle } from 'lucide-react';

export default function CharacterStats() {
  const [stats, setStats] = useState(CHARACTER_STATS);
  const [userXp, setUserXp] = useState(13850);
  const [level, setLevel] = useState(42);
  const [levelUpAlert, setLevelUpAlert] = useState(false);

  const trainStat = (idx: number) => {
    // Increment level & play sfx click
    audioSystem.tapClick();
    
    const nextStats = [...stats];
    if (nextStats[idx].value < nextStats[idx].max) {
      nextStats[idx] = {
        ...nextStats[idx],
        value: Math.min(nextStats[idx].max, nextStats[idx].value + 1)
      };
      setStats(nextStats);
      
      // Earn some XP
      const earnedXp = Math.floor(Math.random() * 45) + 15;
      const newXp = userXp + earnedXp;
      setUserXp(newXp);

      // Check level up condition (threshold of 1000 XP)
      if (Math.floor(newXp / 14000) > Math.floor(userXp / 14000)) {
        setLevel(prev => prev + 1);
        setLevelUpAlert(true);
        audioSystem.nodeUnlock();
        setTimeout(() => setLevelUpAlert(false), 3000);
      }
    } else {
      audioSystem.warningBeep();
    }
  };

  return (
    <div className="space-y-6" id="character-stats-panel">
      {/* RPG Level Indicator HUD block */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Core level status */}
        <div className="p-4 rounded-lg bg-slate-900 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu className="w-12 h-12 text-cyan-400" />
          </div>
          <span className="text-[10px] text-cyan-500 font-mono tracking-widest font-semibold uppercase">SYSTEM COGNIZANCE</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl text-cyan-400 font-bold font-mono tracking-tight">{level}</span>
            <span className="text-xs text-cyan-500/50 font-mono">LEVEL</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">Class-S Autonomy Policy</span>
        </div>

        {/* Global XP accumulated */}
        <div className="p-4 rounded-lg bg-slate-900 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-12 h-12 text-blue-400" />
          </div>
          <span className="text-[10px] text-blue-500 font-mono tracking-widest font-semibold uppercase">EXPERIENCE MATRIX</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xl text-blue-400 font-bold font-mono tracking-tight">{userXp.toLocaleString()}</span>
            <span className="text-[10px] text-blue-500/60 font-mono">/ 20,000 XP</span>
          </div>
          {/* Custom micro slider for visual aesthetic progress */}
          <div className="w-full bg-slate-950 rounded-full h-1 mt-2.5 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500" 
              style={{ width: `${(userXp % 14000) / 140}%` }}
            />
          </div>
        </div>

        {/* Node unlock multiplier */}
        <div className="p-4 rounded-lg bg-slate-900 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award className="w-12 h-12 text-purple-400" />
          </div>
          <span className="text-[10px] text-purple-500 font-mono tracking-widest font-semibold uppercase">ACTIVE UPGRADES</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl text-purple-400 font-bold font-mono tracking-tight">17</span>
            <span className="text-[10px] text-purple-500/60 font-mono">NODES SECURED</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">100% Core System Synchronization</span>
        </div>

        {/* Global efficiency rating */}
        <div className="p-4 rounded-lg bg-slate-900 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-12 h-12 text-cyan-400" />
          </div>
          <span className="text-[10px] text-cyan-500 font-mono tracking-widest font-semibold uppercase">EFFICIENCY RATIO</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl text-cyan-400 font-bold font-mono tracking-tight">94.8%</span>
            <span className="text-[10px] text-cyan-500/60 font-mono">COHERENCY</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">Loop frequency: 400Hz</span>
        </div>
      </div>

      {/* Level Up Flash Indicator Notification */}
      {levelUpAlert && (
        <div className="bg-cyan-950/80 border border-cyan-400 text-cyan-400 px-4 py-2.5 rounded-lg font-mono text-xs flex items-center justify-between shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-bounce">
          <span className="font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400 animate-spin" />
            SYSTEM NOTICE: PREETI_OS CORE COHERANCE LEVEL EXPANDED TO LEVEL {level}!
          </span>
          <span className="text-[10px] opacity-80">Matrix recalibrating...</span>
        </div>
      )}

      {/* Master stats array list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, idx) => {
          const filled = Math.round(stat.value / 10);
          
          return (
            <div 
              key={stat.name}
              className="p-4 bg-slate-950/70 border border-cyan-500/10 hover:border-cyan-500/30 rounded-lg transition-all flex flex-col justify-between relative group shadow-[inset_0_0_15px_rgba(6,182,212,0.01)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-cyan-200 font-medium tracking-tight">
                    {stat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans tracking-wide">
                    {stat.tagline}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-semibold text-cyan-400">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] text-cyan-500/30">
                    /100
                  </span>
                </div>
              </div>

              {/* Graphic Progress Trackbar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-900 rounded h-2 overflow-hidden relative border border-cyan-950">
                  <div 
                    className="h-full bg-cyan-700/80 group-hover:bg-cyan-500 h-full transition-all duration-300 relative shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                    style={{ width: `${stat.value}%` }}
                  >
                    {/* Custom moving pulse scanline along progress trail */}
                    <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white opacity-40 animate-pulse" />
                  </div>
                </div>

                {/* Simulated test button to allocate score */}
                <button
                  onClick={() => trainStat(idx)}
                  className="px-2 py-1 bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 text-[9px] text-cyan-300 hover:text-cyan-200 uppercase font-mono rounded select-none cursor-pointer tracking-wider shrink-0 transition-colors"
                  title="Simulate active system training"
                >
                  ALLOCATE_XP
                </button>
              </div>

              {/* RPG tool-tips trigger */}
              <div className="mt-2.5 flex items-center justify-between text-[9px] text-cyan-500/40 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                <span>SYSTEM REGISTRATION: STEADY</span>
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" /> Click ALLOCATE_XP to test node
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
