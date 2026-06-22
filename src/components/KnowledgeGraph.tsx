import React, { useState, useRef, useEffect } from 'react';
import { KNOWLEDGE_GRAPH_DATA } from '../data';
import { GraphNode } from '../types';
import { audioSystem } from '../lib/AudioEngine';
import { ZoomIn, ZoomOut, RotateCcw, Hand, Eye, Move } from 'lucide-react';

export default function KnowledgeGraph() {
  const [nodes, setNodes] = useState<GraphNode[]>(KNOWLEDGE_GRAPH_DATA.nodes);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(KNOWLEDGE_GRAPH_DATA.nodes[0] || null);
  const [activeEdgeSource, setActiveEdgeSource] = useState<string | null>(null);
  
  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 180, y: 150 });
  
  // Interaction variables
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingNodeRef = useRef<string | null>(null);
  const draggingCanvasRef = useRef<boolean>(false);
  const startDragOffsetRef = useRef({ x: 0, y: 0 });
  const startPanRef = useRef({ x: 0, y: 0 });

  // Floating micro animation values
  useEffect(() => {
    let animationId: number;
    let time = 0;

    const tick = () => {
      time += 0.015;
      setNodes(prevNodes => 
        prevNodes.map((node, index) => {
          // If node is currently being dragged, don't float it
          if (draggingNodeRef.current === node.id) return node;
          
          // Apply a gentle subtle floating wave based on indexes (different phases)
          const fx = Math.sin(time + index) * 0.25;
          const fy = Math.cos(time * 0.8 + index) * 0.25;
          return {
            ...node,
            x: node.x + fx,
            y: node.y + fy
          };
        })
      );
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseDownNode = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    audioSystem.tapClick();
    
    // Set selected
    const found = nodes.find(n => n.id === id);
    if (found) setSelectedNode(found);
    
    draggingNodeRef.current = id;
    setActiveEdgeSource(id);

    // Save offset
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      const node = nodes.find(n => n.id === id);
      if (node) {
        // Calculate original coordinates relative to scale
        const transformedNodeX = node.x * zoom + pan.x;
        const transformedNodeY = node.y * zoom + pan.y;
        
        startDragOffsetRef.current = {
          x: clientX - transformedNodeX,
          y: clientY - transformedNodeY
        };
      }
    }
  };

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    draggingCanvasRef.current = true;
    startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    if (draggingNodeRef.current) {
      // Move Node
      const currentDragId = draggingNodeRef.current;
      
      // Remove panning and zoom effects to locate true coordinates
      const targetX = (clientX - startDragOffsetRef.current.x - pan.x) / zoom;
      const targetY = (clientY - startDragOffsetRef.current.y - pan.y) / zoom;
      
      setNodes(prev => prev.map(n => {
        if (n.id === currentDragId) {
          return { ...n, x: targetX, y: targetY };
        }
        return n;
      }));
    } else if (draggingCanvasRef.current) {
      // Pan Canvas
      setPan({
        x: e.clientX - startPanRef.current.x,
        y: e.clientY - startPanRef.current.y
      });
    }
  };

  const handleMouseUp = () => {
    draggingNodeRef.current = null;
    draggingCanvasRef.current = false;
  };

  const resetViewport = () => {
    audioSystem.tapClick();
    setZoom(1.0);
    setPan({ x: 180, y: 150 });
  };

  const triggerZoom = (amount: number) => {
    audioSystem.tapClick();
    setZoom(prev => Math.max(0.5, Math.min(2.0, prev + amount)));
  };

  return (
    <div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 border border-cyan-500/20 bg-slate-950/40 p-4 rounded-xl relative overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.02)]"
      id="knowledge-graph-section"
    >
      {/* Decorative hud labels */}
      <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none select-none">
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
        <span className="text-[10px] text-cyan-400 tracking-wider font-mono uppercase font-semibold">Interactive Spatial Knowledge-Domain Mesh</span>
      </div>

      {/* SVG Canvas Workspace (2/3 width) */}
      <div 
        ref={containerRef}
        className="lg:col-span-2 h-[380px] bg-slate-950/80 border border-slate-900 rounded-lg relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDownCanvas}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Futuristic Grid Drawing */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(6,182,212,0.04) 2px, transparent 2px)`,
            backgroundSize: `${32 * zoom}px ${32 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
        />

        {/* Floating elements inside transformative viewport group */}
        <svg className="w-full h-full absolute inset-0">
          <defs>
            <filter id="glow-svg" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="edge-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Group translating panning & zooms */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Draw Relationship Lines (Edges) */}
            {KNOWLEDGE_GRAPH_DATA.edges.map((edge, key) => {
              const src = nodes.find(n => n.id === edge.source);
              const tgt = nodes.find(n => n.id === edge.target);
              if (!src || !tgt) return null;

              const isEdgeActive = selectedNode?.id === src.id || selectedNode?.id === tgt.id;

              return (
                <g key={key}>
                  {/* Subtle vector edge */}
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke={isEdgeActive ? 'url(#edge-grad-active)' : 'url(#edge-grad)'}
                    strokeWidth={isEdgeActive ? 2 : 1}
                  />

                  {/* Pulsing light signal driving along path */}
                  {isEdgeActive && (
                    <circle r="3" fill="#22d3ee" style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
                      <animateMotion
                        path={`M ${src.x} ${src.y} L ${tgt.x} ${tgt.y}`}
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Draw Draggable Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseDown={(e) => handleMouseDownNode(e, node.id)}
                  className="cursor-pointer"
                >
                  {/* Outer active shadow focus Ring */}
                  <circle
                    r={isSelected ? 18 : 12}
                    fill="transparent"
                    stroke={isSelected ? 'rgba(34, 211, 238, 0.4)' : 'rgba(59, 130, 246, 0.15)'}
                    strokeWidth="1.5"
                    className={isSelected ? 'animate-pulse' : ''}
                  />

                  {/* Inner Node Core */}
                  <circle
                    r={isSelected ? 8 : 6}
                    fill={isSelected ? '#06b6d4' : '#1e293b'}
                    stroke={isSelected ? '#22d3ee' : '#3b82f6'}
                    strokeWidth="2"
                    style={isSelected ? { filter: 'drop-shadow(0 0 6px #22d3ee)' } : {}}
                  />

                  {/* Node Label Display */}
                  <text
                    y="22"
                    textAnchor="middle"
                    fill={isSelected ? '#22d3ee' : '#cbd5e1'}
                    className="font-mono text-[9px] font-medium tracking-tight select-none pointer-events-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Zoom Controls HUD Pad Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-cyan-500/20 px-2 py-1.5 rounded-md flex items-center gap-2.5 shadow-lg">
          <button 
            onClick={() => triggerZoom(0.1)} 
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            title="Spatially Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => triggerZoom(-0.1)} 
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            title="Spatially Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={resetViewport} 
            className="text-cyan-400 hover:text-cyan-300 transition-colors border-l border-cyan-500/20 pl-2"
            title="Recapitulate Grid View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="h-4 w-[1px] bg-cyan-500/20" />
          <div className="text-[9px] text-cyan-500 font-mono tracking-wider flex items-center gap-1">
            <Move className="w-3 h-3 text-cyan-400" />
            <span>DRAG SYSTEM NODES TO EXPLORE</span>
          </div>
        </div>
      </div>

      {/* Node Detail Side Panel Information Drawer (1/3 width) */}
      <div className="bg-slate-900/85 border border-cyan-500/10 rounded-lg p-5 flex flex-col justify-between overflow-hidden relative">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="border-b border-cyan-500/20 pb-3 flex flex-col">
              <span className="text-[10px] text-cyan-500/60 font-mono uppercase tracking-widest font-bold">Node State: Unlocked</span>
              <h4 className="text-base text-cyan-400 font-mono font-medium tracking-tight mt-1">{selectedNode.label}</h4>
            </div>

            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="space-y-3.5 pt-2">
              {/* Connected tools */}
              <div>
                <span className="text-[10px] text-cyan-400 font-semibold font-mono uppercase tracking-wider block mb-1.5">Registered Modules & Software:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.relatedTools.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 font-mono text-[9px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Projects */}
              <div>
                <span className="text-[10px] text-cyan-400 font-semibold font-mono uppercase tracking-wider block mb-1.5">Linked Core Projects:</span>
                <ul className="space-y-1">
                  {selectedNode.relatedProjects.map((p, i) => (
                    <li key={i} className="text-slate-300 text-xs font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research */}
              <div>
                <span className="text-[10px] text-cyan-400 font-semibold font-mono uppercase tracking-wider block mb-1.5">Relevant Research Domains:</span>
                <ul className="space-y-1">
                  {selectedNode.relatedResearch.map((r, i) => (
                    <li key={i} className="text-slate-300 text-xs font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Eye className="w-8 h-8 text-cyan-500/20 mb-2 animate-pulse" />
            <span className="font-mono text-xs text-cyan-500/50">Awaiting Node Exploration selection...</span>
          </div>
        )}

        <div className="border-t border-cyan-500/10 pt-3 mt-4 flex items-center justify-between text-[9px] text-cyan-500/50 font-mono">
          <span>COORDS: X={selectedNode ? Math.round(selectedNode.x) : 0}, Y={selectedNode ? Math.round(selectedNode.y) : 0}</span>
          <span>REACTIVE MATRIX</span>
        </div>
      </div>
    </div>
  );
}
