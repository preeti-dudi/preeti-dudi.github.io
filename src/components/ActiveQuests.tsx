import { useState } from 'react';
import { ACTIVE_QUESTS } from '../data';
import { audioSystem } from '../lib/AudioEngine';
import { ShieldCheck, Crosshair, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function ActiveQuests() {
  const [quests] = useState(ACTIVE_QUESTS);
  const [expandedQuestId, setExpandedQuestId] = useState<string | null>('main-quest');

  const toggleQuestExpand = (id: string) => {
    audioSystem.tapClick();
    setExpandedQuestId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-4" id="active-quests-container">
      {quests.map((quest) => {
        const isExpanded = expandedQuestId === quest.id;
        const isCompleted = quest.status === 'completed';

        // Difficulty Color Class calculation
        let diffColor = 'text-[#00d2ff] border-[#00d2ff]/20 bg-[#00d2ff]/10';
        if (quest.difficulty === 'CLASS-S') {
          diffColor = 'text-rose-400 border-rose-500/30 bg-rose-950/20 animate-pulse';
        } else if (quest.difficulty === 'HARD') {
          diffColor = 'text-amber-400 border-amber-500/30 bg-amber-950/20';
        }

        return (
          <div 
            key={quest.id}
            className={`transition-all rounded-sm border ${
              isCompleted 
                ? 'bg-[#050507]/40 border-emerald-500/20 opacity-80' 
                : isExpanded 
                  ? 'bg-[#050507]/90 border-[#00d2ff44] shadow-[0_0_15px_rgba(0,210,255,0.06)]' 
                  : 'bg-[#12121a]/85 border-[#00d2ff1a] hover:border-[#00d2ff33]'
            }`}
          >
            {/* Quest Card Header Bar */}
            <div 
              onClick={() => toggleQuestExpand(quest.id)}
              className="px-4 py-3.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-950/40 border border-emerald-500 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center text-[#00d2ff]">
                    <Crosshair className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#00d2ff]/70">
                      {quest.type}
                    </span>
                    <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${diffColor}`}>
                      {quest.difficulty}
                    </span>
                  </div>
                  <h4 className={`font-mono text-xs font-semibold tracking-tight mt-0.5 ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                    {quest.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-right">
                {/* Visual completion percent tag */}
                <span className="font-mono text-[10px] text-[#00d2ff]">
                  {quest.progress}%
                </span>
                
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#00d2ff]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#00d2ff]" />
                )}
              </div>
            </div>

            {/* Expansive panel parameters */}
            {isExpanded && (
              <div className="px-4 pb-4 pt-1.5 border-t border-[#00d2ff1a] space-y-3.5">
                <div className="space-y-1">
                  <span className="text-[9px] text-[#00d2ff]/60 font-mono tracking-wide uppercase block">Mission Statement:</span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {quest.description}
                  </p>
                </div>

                {/* Progress bar tracker visual block */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-[#00d2ff]/60 font-mono tracking-wide uppercase block">Action Progress:</span>
                  <div className="w-full bg-[#050507] rounded-sm h-1.5 overflow-hidden border border-[#00d2ff1a]">
                    <div 
                      className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-[#00d2ff]'}`}
                      style={{ width: `${quest.progress}%` }}
                    />
                  </div>
                </div>

                {/* Mission Rewards listing */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[9px] text-purple-400 font-semibold font-mono uppercase tracking-wider block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" /> MISSION_COMPLETION_REWARDS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quest.rewards.map((reward, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-purple-950/20 border border-purple-500/20 text-purple-300 font-mono text-[9px]">
                        {reward}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
