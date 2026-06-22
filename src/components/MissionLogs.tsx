import { useState } from 'react';
import { MISSION_LOGS } from '../data';
import { audioSystem } from '../lib/AudioEngine';
import { Calendar, Layers, Shield, Sparkle, Plus, Minus } from 'lucide-react';

type LogFilter = 'ALL' | 'GUILD_ONLY' | 'SIDE_QUEST_ONLY';

export default function MissionLogs() {
  const [logs, setLogs] = useState(MISSION_LOGS);
  const [filter, setFilter] = useState<LogFilter>('ALL');
  const [expandedLogId, setExpandedLogId] = useState<string | null>('log7'); // Default to MTech log open

  const handleToggleExpand = (id: string) => {
    audioSystem.tapClick();
    setExpandedLogId(prev => prev === id ? null : id);
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'GUILD_ONLY') return log.category === 'Guild Mission Log';
    if (filter === 'SIDE_QUEST_ONLY') return log.category === 'Side Quest Log';
    return true;
  });

  return (
    <div className="space-y-6" id="timeline-logs-section">
      {/* Category selector menu */}
      <div className="flex gap-2 border-b border-cyan-500/10 pb-3 justify-center md:justify-start">
        <button
          onClick={() => { audioSystem.tapClick(); setFilter('ALL'); }}
          className={`px-3 py-1 text-[10px] font-mono border rounded uppercase cursor-pointer transition-colors ${
            filter === 'ALL'
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
              : 'border-cyan-500/15 text-cyan-500/60 hover:text-cyan-400 hover:border-cyan-500/30'
          }`}
        >
          ALL_LOGS_STREAM
        </button>
        <button
          onClick={() => { audioSystem.tapClick(); setFilter('GUILD_ONLY'); }}
          className={`px-3 py-1 text-[10px] font-mono border rounded uppercase cursor-pointer transition-colors ${
            filter === 'GUILD_ONLY'
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
              : 'border-cyan-500/15 text-cyan-500/60 hover:text-cyan-400 hover:border-cyan-500/30'
          }`}
        >
          GUILD_MISSIONS (CAREER & DEGREE)
        </button>
        <button
          onClick={() => { audioSystem.tapClick(); setFilter('SIDE_QUEST_ONLY'); }}
          className={`px-3 py-1 text-[10px] font-mono border rounded uppercase cursor-pointer transition-colors ${
            filter === 'SIDE_QUEST_ONLY'
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
              : 'border-cyan-500/15 text-cyan-500/60 hover:text-cyan-400 hover:border-cyan-500/30'
          }`}
        >
          SIDE_QUEST_LOGS (PROTOTYPES)
        </button>
      </div>

      {/* Timeline core vector channel list */}
      <div className="relative pl-6 md:pl-8 border-l-2 border-cyan-500/10 ml-3 md:ml-4 space-y-6 pt-2">
        {filteredLogs.map((log) => {
          const isExpanded = expandedLogId === log.id;
          const isGuildCategory = log.category === 'Guild Mission Log';

          return (
            <div key={log.id} className="relative group/log">
              {/* Timeline Vector point dot selector marker */}
              <div 
                className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all bg-slate-950 ${
                  isExpanded 
                    ? 'border-cyan-400 text-cyan-400 scale-110 shadow-[0_0_8px_rgba(6,182,212,0.4)]' 
                    : isGuildCategory 
                      ? 'border-cyan-500/25 text-cyan-500/50 group-hover/log:border-cyan-400 group-hover/log:text-cyan-400' 
                      : 'border-purple-500/20 text-purple-500/30 group-hover/log:border-purple-400 group-hover/log:text-purple-400'
                }`}
              >
                {isGuildCategory ? (
                  <Shield className="w-1.5 h-1.5 fill-current" />
                ) : (
                  <Sparkle className="w-1.5 h-1.5 fill-current" />
                )}
              </div>

              {/* Log Card Frame */}
              <div 
                className={`p-4 rounded-xl border transition-all ${
                  isExpanded 
                    ? 'bg-slate-950/80 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.03)]' 
                    : 'bg-slate-900/50 border-cyan-500/10 hover:border-cyan-500/20'
                }`}
              >
                {/* Micro head indicators */}
                <div 
                  onClick={() => handleToggleExpand(log.id)}
                  className="flex items-start justify-between cursor-pointer select-none gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-[9px] text-cyan-500/60 flex items-center gap-1 font-semibold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" /> {log.date}
                      </span>
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                        isGuildCategory 
                          ? 'border-cyan-500/20 text-cyan-400 bg-cyan-950/10' 
                          : 'border-purple-500/20 text-purple-400 bg-purple-950/10'
                      }`}>
                        {log.category.replace(' Log', '')}
                      </span>
                    </div>

                    <h4 className="font-mono text-xs font-semibold tracking-tight text-slate-100 group-hover/log:text-cyan-400 transition-colors mt-1">
                      {log.title}
                    </h4>
                  </div>

                  <div className="text-cyan-500 select-none shrink-0 border border-cyan-500/10 rounded p-1 group-hover/log:border-cyan-500/20 transition-colors">
                    {isExpanded ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-cyan-500/5 space-y-3 animate-fade-in">
                    <p className="text-slate-300 text-xs font-sans leading-relaxed">
                      {log.description}
                    </p>

                    {/* Sub bullet points details lists */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[9px] text-cyan-400 font-semibold font-mono uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> LOGGED_SUBSECTION_ACTIVITIES:
                      </span>
                      <ul className="space-y-1 pl-1">
                        {log.details.map((detail, index) => (
                          <li key={index} className="text-slate-300 text-xs font-mono flex items-start gap-2 leading-relaxed">
                            <span className="text-cyan-500 mt-1">::</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
