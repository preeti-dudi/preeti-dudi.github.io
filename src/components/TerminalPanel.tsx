import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';
import { audioSystem } from '../lib/AudioEngine';
import { CHARACTER_STATS, ROBOTICS_LAB_PROJECTS, ACTIVE_QUESTS } from '../data';

interface TermLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'headline';
}

export default function TerminalPanel() {
  const [history, setHistory] = useState<TermLine[]>([
    { text: 'PREETI_OS [Version 2.026.06]', type: 'headline' },
    { text: 'SYSTEM BACKEND CORE: CONNECTED', type: 'success' },
    { text: 'Type "help" to list available robotic command actions.', type: 'output' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim();
      if (!cmd) return;

      audioSystem.tapClick();
      const nextHistory = [...history, { text: `user@preeti-os:~$ ${cmd}`, type: 'input' as const }];
      setHistory(nextHistory);
      setCommandHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);
      setInputValue('');

      // Parse commands
      parseCommand(cmd.toLowerCase(), nextHistory);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const parseCommand = (cmd: string, currentHistory: TermLine[]) => {
    const parts = cmd.split(' ');
    const primary = parts[0];

    const addOutput = (text: string, type: 'output' | 'success' | 'error' | 'headline' = 'output') => {
      currentHistory.push({ text, type });
    };

    switch (primary) {
      case 'help':
        addOutput('========================================================', 'headline');
        addOutput('PREETI_OS CORE MISSION CONTROL TERMINAL COMMANDS:', 'headline');
        addOutput('========================================================', 'headline');
        addOutput('help        - Display active system command registers.', 'output');
        addOutput('projects    - Query hardware components and firmware status.', 'output');
        addOutput('skills      - Query active physical/software skill logs.', 'output');
        addOutput('quests      - Query primary development missions details.', 'output');
        addOutput('research    - Track cybernetic & Embodied AI research directions.', 'output');
        addOutput('contact     - Print transceiver coordinates & mail address.', 'output');
        addOutput('system      - Run benchmark check on computational subchannels.', 'output');
        addOutput('clear       - Clean display buffer memory registers.', 'output');
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'whoami':
        addOutput('SUBJECT LOG: Preeti (Robotics Engineer & Embodied AI explorer)', 'success');
        addOutput('CURRENT MISSION: Navigating simulation constraints to program physical autonomy.', 'output');
        break;

      case 'projects':
        addOutput('QUERYING LAB LOGS... FOUND 6 HARDWARE REGISTER ENTRIES:', 'headline');
        ROBOTICS_LAB_PROJECTS.forEach(proj => {
          addOutput(`[${proj.status}] - ${proj.title} (${proj.category})`, 'success');
          addOutput(`    -> Tech stack: ${proj.tech.join(', ')}`, 'output');
        });
        break;

      case 'skills':
        addOutput('RETRIEVING APTITUDE MATRIX...', 'headline');
        CHARACTER_STATS.forEach(stat => {
          const filled = Math.round(stat.value / 10);
          const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
          addOutput(`[${stat.name.padEnd(16)}] [${bar}] ${stat.value}% - ${stat.tagline}`, 'output');
        });
        break;

      case 'quests':
        addOutput('TRACKING ENGAGED CAMPAIGN OBJECTIVES:', 'headline');
        ACTIVE_QUESTS.forEach(q => {
          addOutput(`* [${q.type}] ${q.title} - ${q.difficulty}`, 'success');
          addOutput(`  Progress: [${q.progress}%] | Goal: ${q.description}`, 'output');
        });
        break;

      case 'research':
        addOutput('QUERYING DIRECTED LITERATURE ARCHIVE:', 'headline');
        addOutput('  1. Embodied AI Systems & Neural-To-Actuator transformers', 'output');
        addOutput('  2. Kinematic Retargeting from Optical tracker meshes', 'output');
        addOutput('  3. In-Hand Dexterous compliant manipulation calculations', 'output');
        addOutput('  4. Domain Randomization to bridge the simulator-to-reality gap', 'output');
        break;

      case 'contact':
        addOutput('================ NETWORK BEACON GENERATED ================', 'headline');
        addOutput('TRANSCEIVER SECURE ADDRESS: dudi.preeti.official@gmail.com', 'success');
        addOutput('COMMUNICATION BAND: Active via Secure Hub at page footer.', 'output');
        addOutput('Send direct transmission to request complete core schematics.', 'output');
        addOutput('========================================================', 'headline');
        break;

      case 'system':
        addOutput('BOOT CELL TEST INITIATED...', 'headline');
        audioSystem.warningBeep();
        addOutput('>> Core Processing Unit Check: PASS (4.2GHz continuous)', 'success');
        addOutput('>> ROS2 Communication Ring: ONLINE', 'success');
        addOutput('>> Kinematic IK solver loop-rate: 1.2ms [SPEED STABLE]', 'success');
        addOutput('>> Audio procedural synthesis: SYNCED', 'success');
        addOutput('>> SYSTEM RATING: OPTIMAL (Class-S Operational Environment)', 'success');
        break;

      default:
        audioSystem.warningBeep();
        addOutput(`ERROR: Command "${primary}" not registered in kernel database.`, 'error');
        addOutput('Type "help" to display standard commands list.', 'output');
        break;
    }

    setHistory([...currentHistory]);
  };

  return (
    <div 
      className="w-full bg-[#050507] border border-[#ffffff1a] rounded-sm p-4 font-mono text-sm shadow-[0_0_20px_rgba(0,210,255,0.05)] relative overflow-hidden backdrop-blur-md animate-fade-in"
      onClick={focusInput}
      id="terminal-panel-interactive"
    >
      {/* Decorative matrix layout headers */}
      <div className="absolute top-0 inset-x-0 bg-[#0c0c10] border-b border-[#ffffff1a] px-4 py-2 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-[#00d2ff] animate-pulse" />
          <span className="text-xs text-[#00d2ff] font-semibold tracking-wider font-mono">SYSTEM_OPERATING_TERMINAL v2.0</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#00d2ff]/60">
          <span className="px-1.5 py-0.5 rounded-sm bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff]">ROS2_ENGAGED</span>
          <Cpu className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="mt-8 h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#00d2ff]/20 scrollbar-track-transparent">
        {history.map((line, idx) => (
          <div key={idx} className="mb-1.5 leading-relaxed text-xs">
            {line.type === 'input' && (
              <span className="text-[#00d2ff]">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-slate-300">{line.text}</span>
            )}
            {line.type === 'headline' && (
              <span className="text-[#00d2ff] font-bold glow-cyan">{line.text}</span>
            )}
            {line.type === 'success' && (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 inline min-w-3.5 text-emerald-400" />
                {line.text}
              </span>
            )}
            {line.type === 'error' && (
              <span className="text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 inline min-w-3.5 text-rose-400" />
                {line.text}
              </span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <div className="mt-2 pt-2 border-t border-[#00d2ff1a] flex items-center text-xs">
        <span className="text-[#00d2ff] font-bold shrink-0 mr-2">user@preeti-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent text-slate-100 outline-none flex-1 border-none p-0 focus:ring-0 select-text cursor-text placeholder-[#00d2ff]/30"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="input command..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        />
        <span className="w-2 h-4 bg-[#00d2ff] ml-1 blink shrink-0"></span>
      </div>
    </div>
  );
}
