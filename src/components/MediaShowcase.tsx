import { useState, useEffect } from 'react';
import { MEDIA_SHOWCASE_ITEMS } from '../data';
import { audioSystem } from '../lib/AudioEngine';
import { Play, Tv, Volume2, Maximize, Clock, FileVideo } from 'lucide-react';

export default function MediaShowcase() {
  const [items] = useState(MEDIA_SHOWCASE_ITEMS);
  const [activeVideoId, setActiveVideoId] = useState<string>('vid1');
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSecs, setPlaybackSecs] = useState(0);

  const activeVideo = items.find(v => v.id === activeVideoId) || items[0];

  // Simulated visual video play progression timer
  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setPlaybackSecs(prev => {
          // Reset if exceeds length of active segment (e.g., 105 seconds for 1:45)
          const maxSecs = activeVideoId === 'vid1' ? 105 : activeVideoId === 'vid2' ? 150 : 252;
          if (prev >= maxSecs) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeVideoId]);

  const handleTogglePlay = () => {
    audioSystem.tapClick();
    setIsPlaying(prev => !prev);
  };

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const getDurationSecs = (id: string) => {
    return id === 'vid1' ? 105 : id === 'vid2' ? 150 : 252;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="media-showcase-master">
      {/* 3/5 width: Hologram Mock Player HUD Panel */}
      <div className="lg:col-span-3 bg-slate-900/80 border border-cyan-500/20 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-3 select-none pointer-events-none font-mono text-[9px] text-cyan-500/30 flex items-center gap-1">
          <span>CO-AX STREAM FEED: SYNCED</span>
          <Tv className="w-3.5 h-3.5" />
        </div>

        <div className="space-y-4">
          <div className="border-b border-cyan-500/10 pb-3">
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest font-bold flex items-center gap-1.5">
              <FileVideo className="w-4 h-4 text-cyan-400 animate-pulse" /> SYSTEMATIC_VIDEO_DECODER:
            </span>
            <h4 className="text-sm font-mono font-medium text-slate-100 mt-1">{activeVideo.title}</h4>
          </div>

          {/* Video visualizer frame */}
          <div className="bg-slate-950 border border-cyan-950 rounded-lg relative overflow-hidden h-[210px] flex items-center justify-center group flex-col">
            {/* Cyber overlay grid matrix scanner screen effect */}
            <div className="absolute inset-0 bg-radial-gradient(circle, transparent 70%, rgba(0,0,0,0.8) 100%) pointer-events-none z-10" />
            <div className="absolute inset-x-0 h-[1.5px] bg-cyan-400/10 shadow-[0_0_8px_rgba(6,182,212,0.5)] animate-scan z-10 pointer-events-none" />

            {/* Dynamic Oscilloscope sweeping signals based on playback */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0">
              <svg className="w-full h-full">
                <path
                  d={`M 10 100 Q 100 ${isPlaying ? 100 + Math.sin(playbackSecs) * 40 : 100} 240 ${isPlaying ? 100 - Math.cos(playbackSecs) * 45 : 100} T 480 100`}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  className="transition-all duration-1000"
                />
                <circle 
                  cx={((playbackSecs / getDurationSecs(activeVideoId)) * 400) + 30} 
                  cy={100} r="4" fill="#a855f7" 
                  style={{ filter: 'drop-shadow(0 0 4px #a855f7)' }} 
                />
              </svg>
            </div>

            {/* Custom vector graphics mimicking cameras */}
            <div className="text-center z-10 select-none space-y-2">
              <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 bg-cyan-950/20 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
                <Play className={`w-5 h-5 ${isPlaying ? 'animate-ping' : ''}`} />
              </div>
              <span className="font-mono text-[9px] text-cyan-400/50 uppercase tracking-widest block font-semibold">
                {isPlaying ? 'STREAMING DECODED DATA SIGNAL' : 'SIGNAL STREAM RECONSTITUTION PAUSED'}
              </span>
            </div>

            {/* Bottom mini overlays inside video */}
            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[9px] font-mono text-cyan-500/60 z-20 pointer-events-none">
              <span>SOURCE: {activeVideo.source}</span>
              <span>1080P_60FPS</span>
            </div>
          </div>

          {/* Decoded Video Stats */}
          <div className="bg-slate-950/60 p-3 rounded border border-cyan-500/10">
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {activeVideo.description}
            </p>
          </div>
        </div>

        {/* Video Player Action controls bar */}
        <div className="flex items-center justify-between gap-4 pt-3.5 border-t border-cyan-500/10 mt-4 h-9">
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="px-3.5 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-[10px] uppercase font-mono text-cyan-300 hover:text-cyan-200 cursor-pointer select-none rounded flex items-center gap-1.5 transition-colors"
            >
              {isPlaying ? 'PAUSE_DECODER' : 'ENGAGE_PLAYTIME'}
            </button>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(playbackSecs)}</span>
              <span>/</span>
              <span>{activeVideo.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-cyan-400/60">
            <Volume2 className="w-4 h-4 hover:text-cyan-300 transition-colors cursor-pointer" onClick={() => audioSystem.tapClick()} />
            <Maximize className="w-4 h-4 hover:text-cyan-300 transition-colors cursor-pointer" onClick={() => audioSystem.tapClick()} />
          </div>
        </div>
      </div>

      {/* 2/5 width: Sidebar index list choosing telemetry feed */}
      <div className="lg:col-span-2 space-y-3.5">
        <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest font-bold block mb-1.5 select-none font-semibold pl-1">
          AVAILABLE MEDIA RECORDS:
        </span>

        {items.map((item) => {
          const isActive = item.id === activeVideoId;
          
          return (
            <div
              key={item.id}
              onClick={() => {
                audioSystem.tapClick();
                setActiveVideoId(item.id);
                setPlaybackSecs(0);
                setIsPlaying(true);
              }}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-cyan-950/30 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.12)] text-cyan-200'
                  : 'bg-slate-950/50 border-cyan-500/10 text-slate-400 hover:border-cyan-500/20 hover:text-slate-300'
              }`}
            >
              <div>
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest uppercase mb-1">
                  <span>{item.category}</span>
                  <span className="text-cyan-500">{item.duration}</span>
                </div>
                <h5 className="font-mono text-xs font-semibold leading-tight text-slate-200 group-hover:text-cyan-400">
                  {item.title}
                </h5>
              </div>

              <div className="flex items-center justify-between mt-3 text-[90%] font-mono text-[9px] text-cyan-500/40">
                <span>RECON_RECORDS:</span>
                <span className="text-cyan-400">{item.clicks} PING CLICKS</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
