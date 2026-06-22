import { useState } from 'react';
import { SKILL_TREE_NODES } from '../data';
import { SkillNode, SkillCategory } from '../types';
import { audioSystem } from '../lib/AudioEngine';
import { Network, Star, CheckCircle, ChevronRight, Lock } from 'lucide-react';

export default function SkillTree() {
  const [nodes, setNodes] = useState<SkillNode[]>(SKILL_TREE_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('js');

  const upgradeSkill = (id: string) => {
    const nextNodes = nodes.map(node => {
      if (node.id === id) {
        if (node.level < node.maxLevel) {
          audioSystem.nodeUnlock();
          return {
            ...node,
            level: node.level + 1,
            unlocked: true
          };
        } else {
          audioSystem.warningBeep();
        }
      }
      return node;
    });

    setNodes(nextNodes);
  };

  const categories: SkillCategory[] = [
    'Software Engineering',
    'Robotics',
    'AI',
    'Simulation'
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="skill-tree-panel">
      {/* Categories layout columns (2/3 size span) */}
      <div className="md:col-span-3 space-y-6">
        {categories.map((cat) => {
          const catNodes = nodes.filter(n => n.category === cat);
          
          return (
            <div key={cat} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-cyan-500/10 pb-1.5">
                <Network className="w-4 h-4 text-cyan-400" />
                <h4 className="font-mono text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                  {cat}
                </h4>
              </div>

              {/* Grid of skill elements within category */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {catNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  
                  return (
                    <div
                      key={node.id}
                      onClick={() => {
                        audioSystem.tapClick();
                        setSelectedNodeId(node.id);
                      }}
                      className={`p-3 rounded-lg border cursor-pointer select-none transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)] text-cyan-200' 
                          : 'bg-slate-900/60 border-cyan-500/10 text-slate-400 hover:border-cyan-500/25 hover:text-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-mono text-xs font-bold truncate">
                          {node.name}
                        </span>
                        
                        {node.level === node.maxLevel ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Star className="w-3.5 h-3.5 text-cyan-500/30 shrink-0" />
                        )}
                      </div>

                      {/* Display minor stats bars representation inside node */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex gap-1">
                          {Array.from({ length: node.maxLevel }).map((_, i) => (
                            <span 
                              key={i}
                              className={`h-1.5 w-3 rounded-sm ${
                                i < node.level ? 'bg-cyan-400' : 'bg-slate-950 border border-cyan-500/10'
                              }`}
                            />
                          ))}
                        </div>

                        <span className="font-mono text-[9px] text-cyan-500/50">
                          LVL {node.level}/{node.maxLevel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Side Hud panel (1/3 size span) */}
      <div className="bg-slate-900/80 border border-cyan-500/25 rounded-xl p-5 flex flex-col justify-between h-fit min-h-[300px] relative shadow-lg">
        {/* Holographic matrix grids lines */}
        <div className="absolute top-0 right-0 p-3 text-[10px] text-cyan-500/20 font-mono pointer-events-none select-none">
          SYS_TA-NODE
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[9px] text-cyan-500 font-mono tracking-widest font-bold uppercase block">
              {selectedNode.category}
            </span>
            <h5 className="font-mono text-base text-cyan-400 font-medium tracking-tight mt-1">
              {selectedNode.name}
            </h5>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] text-cyan-500/60 font-mono tracking-wide uppercase block">Registered Telemetry Description:</span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {selectedNode.description}
            </p>
          </div>

          {selectedNode.requiredSkills.length > 0 && (
            <div className="pt-2">
              <span className="text-[9px] text-purple-400 font-semibold font-mono uppercase tracking-wider block mb-1">UNLOCKED BY ROOT PREREQUISITE:</span>
              <div className="flex items-center gap-1.5 mt-1 text-slate-300 text-xs font-mono">
                <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="px-1.5 py-0.5 rounded bg-purple-950/40 border border-purple-500/20 text-purple-300 text-[10px]">
                  {nodes.find(n => n.id === selectedNode.requiredSkills[0])?.name || selectedNode.requiredSkills[0]}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => upgradeSkill(selectedNode.id)}
            disabled={selectedNode.level === selectedNode.maxLevel}
            className={`w-full py-2 border rounded font-mono text-xs uppercase cursor-pointer select-none flex items-center justify-center gap-1.5 transition-all ${
              selectedNode.level === selectedNode.maxLevel
                ? 'bg-slate-950 border-cyan-500/10 text-cyan-500/30 cursor-not-allowed'
                : 'bg-cyan-950 hover:bg-cyan-900 border-cyan-400 text-cyan-300 hover:text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
            }`}
          >
            {selectedNode.level === selectedNode.maxLevel ? (
              <>MAX LEVEL UNLOCKED</>
            ) : (
              <>UPGRADE_SKILL_NODE</>
            )}
          </button>

          <div className="flex items-center justify-between text-[9px] text-cyan-500/40 font-mono pt-2 border-t border-cyan-500/10 text-center">
            <span>UPGRADE_INDEX_REGISTER</span>
            <span>OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
