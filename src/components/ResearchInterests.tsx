import { useState } from 'react';
import { RESEARCH_INTERESTS } from '../data';
import { audioSystem } from '../lib/AudioEngine';
import { Cpu, Atom, Terminal, Target, ArrowRight } from 'lucide-react';

export default function ResearchInterests() {
  const [research] = useState(RESEARCH_INTERESTS);
  const [activeId, setActiveId] = useState<string>('embodied-ai');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="research-interests-main">
      {/* List layout of core Research Categories (2/3 width) */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {research.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => {
                audioSystem.tapClick();
                setActiveId(item.id);
              }}
              className={`p-4 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-[#00d2ff]/10 border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.15)] text-[#00d2ff]'
                  : 'bg-[#12121a]/85 border-[#00d2ff1a] text-slate-400 hover:border-[#00d2ff33] hover:text-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[8px] font-mono tracking-wider">
                  <span className="text-[#00d2ff] font-semibold">{item.tag}</span>
                  <Atom className={`w-3.5 h-3.5 ${isActive ? 'text-[#00d2ff] animate-spin' : 'text-slate-600'}`} />
                </div>
                
                <h4 className="font-mono text-xs font-semibold tracking-tight">
                  {item.title}
                </h4>
                
                <p className="text-[10px] leading-relaxed font-sans text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Mini visual complexity indicator */}
              <div className="mt-4 pt-3 border-t border-[#00d2ff1a] flex items-center justify-between text-[9px] font-mono">
                <span>MATRICULATION:</span>
                <span className="text-[#00d2ff]">{item.complexity}% COMPLEXITY</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected research module detailed telemetry display (1/3 width) */}
      <div className="bg-[#12121a]/95 border border-[#00d2ff33] rounded-sm p-5 flex flex-col justify-between h-fit min-h-[340px] relative shadow-lg">
        {/* Holographic scanning text overlay */}
        <div className="absolute top-0 right-0 p-3 text-[9px] text-[#00d2ff]/30 font-mono select-none pointer-events-none">
          SYS_RES_BLOCK
        </div>

        {(() => {
          const selected = research.find(r => r.id === activeId) || research[0];
          return (
            <div className="space-y-4">
              <div>
                <span className="text-[9px] text-[#00d2ff] font-mono tracking-widest font-bold uppercase block">
                  {selected.tag} REGISTER
                </span>
                <h3 className="font-mono text-base text-[#00d2ff] font-medium tracking-tight mt-1">
                  {selected.title}
                </h3>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-[#00d2ff]/60 font-mono tracking-wide uppercase block">Core Thesis direction:</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selected.description}
                </p>
              </div>

              {/* Research subsections module elements list */}
              <div className="space-y-2 pt-2">
                <span className="text-[9px] text-[#00d2ff] font-semibold font-mono uppercase tracking-wider block flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" /> SYSTEMATIC_INVESTIGATION_NODES:
                </span>
                <ul className="space-y-1.5 pl-1">
                  {selected.modules.map((m, i) => (
                    <li key={i} className="text-slate-300 text-xs font-mono flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-[#00d2ff] shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advanced metric sliders */}
              <div className="space-y-1 pt-3.5 border-t border-[#00d2ff1a]">
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-[#00d2ff]" />
                    <span>ALIGNED RESEARCH VELOCITY:</span>
                  </div>
                  <span className="text-[#00d2ff]">{selected.complexity}%</span>
                </div>
                <div className="w-full bg-[#050507] rounded-sm h-1 overflow-hidden relative">
                  <div className="bg-[#00d2ff] h-full absolute left-0" style={{ width: `${selected.complexity}%` }} />
                </div>
              </div>
            </div>
          );
        })()}

        <div className="text-[9px] font-mono text-[#00d2ff]/40 text-center pt-3 border-t border-[#00d2ff1a] mt-6 select-none pointer-events-none">
          SECURE ENCRYPTED ACADEMIC SCHEMAS
        </div>
      </div>
    </div>
  );
}
