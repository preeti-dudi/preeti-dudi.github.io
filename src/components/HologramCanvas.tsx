import { useEffect, useRef } from 'react';

export default function HologramCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Particle pool representation
    interface Particle {
      x: number;
      y: number;
      z: number;
      ox: number; // Original x relative to center
      oy: number; // Original y relative to center
      oz: number; // Original z relative to center
      color: string;
      size: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 140;

    // Create a rotating 3D robotic arm / lattice mesh coordinate sequence
    for (let i = 0; i < maxParticles; i++) {
      // Form some futuristic geometries (a robotic link structure or rings)
      const u = Math.random();
      const v = Math.random();
      
      let x = 0, y = 0, z = 0;
      let color = 'rgba(6, 182, 212, 0.5)'; // Cyan
      let size = 1.2;

      if (i < 40) {
        // Core central sphere
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const radius = 60 + Math.random() * 5;
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
        color = 'rgba(6, 182, 212, 0.7)'; // Cyan core
        size = 1.5;
      } else if (i < 90) {
        // Outer robotic arm joints (rotating lines)
        const radius = 120 + Math.random() * 20;
        const angle = v * Math.PI * 2;
        const offsetHeight = (u - 0.5) * 80;
        x = radius * Math.cos(angle);
        y = offsetHeight;
        z = radius * Math.sin(angle);
        color = 'rgba(59, 130, 246, 0.5)'; // Blue accents
      } else {
        // Starfield background parameters
        const theta = Math.random() * Math.PI * 2;
        const radius = 200 + Math.random() * 80;
        x = radius * Math.cos(theta);
        y = (Math.random() - 0.5) * 200;
        z = radius * Math.sin(theta);
        color = 'rgba(168, 85, 247, 0.4)'; // Purple orbiters
        size = 1.0;
      }

      particles.push({
        x: 0, y: 0, z: 0,
        ox: x, oy: y, oz: z,
        color,
        size
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;
    let rotationX = 0;
    let rotationY = 0;

    // Mouse coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.15;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Frame loops
    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Add rotation increments
      rotationX += angleX;
      rotationY += angleY;

      // Camera parameters
      const fov = 350;
      const cx = width / 2;
      const cy = height / 2;

      // Draw mathematical radar grids
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1;
      
      // Horizontal sweeping grid lines
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, Math.abs(i) * 50 + 20 + Math.sin(rotationY) * 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshair indicators
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy);
      ctx.lineTo(cx + 30, cy);
      ctx.moveTo(cx, cy - 30);
      ctx.lineTo(cx, cy + 30);
      ctx.stroke();

      // Project and draw particles
      const projected: { x: number; y: number; size: number; color: string; z: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotations based on matrix calculations
        // Rotate X
        let y1 = p.oy * Math.cos(rotationX) - p.oz * Math.sin(rotationX);
        let z1 = p.oy * Math.sin(rotationX) + p.oz * Math.cos(rotationX);

        // Rotate Y
        let x2 = p.ox * Math.cos(rotationY) - z1 * Math.sin(rotationY);
        let z2 = p.ox * Math.sin(rotationY) + z1 * Math.cos(rotationY);

        // Adjust slightly with mouse
        x2 += mouseX;
        y1 += mouseY;

        // Perspective projection
        const scale = fov / (fov + z2);
        const px = x2 * scale + cx;
        const py = y1 * scale + cy;

        // Store projected coordinate points
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          projected.push({
            x: px,
            y: py,
            size: p.size * scale * 1.5,
            color: p.color,
            z: z2
          });
        }
      }

      // Sort projected points by depth Z (painters algorithm)
      projected.sort((a, b) => b.z - a.z);

      // Connect near points to make HUD vector structure
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only draw edge vectors if they represent near nodes (creates robotic linkage meshes)
          if (dist < 45 && Math.abs(projected[i].z - projected[j].z) < 60) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw all nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fill();

        // Add visual flares on outer nodes
        if (i % 15 === 0) {
          ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Core system pulse ring
      const pulseRadius = 130 + Math.sin(Date.now() * 0.002) * 8;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0 bg-radial from-slate-950 via-[#030712] to-black"
      id="hologram-canvas-hud"
    />
  );
}
