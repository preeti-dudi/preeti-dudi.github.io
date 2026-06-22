import React, { useState, useEffect, useRef } from "react";
import HologramCanvas from "./components/HologramCanvas";
import TerminalPanel from "./components/TerminalPanel";
import KnowledgeGraph from "./components/KnowledgeGraph";
import CharacterStats from "./components/CharacterStats";
import SkillTree from "./components/SkillTree";
import ActiveQuests from "./components/ActiveQuests";
import MissionLogs from "./components/MissionLogs";
import RoboticsLab from "./components/RoboticsLab";
import ResearchInterests from "./components/ResearchInterests";
import MediaShowcase from "./components/MediaShowcase";
import { audioSystem } from "./lib/AudioEngine";

// Icons
import {
  Cpu,
  Map,
  Layers,
  Network,
  Target,
  Calendar,
  Atom,
  Video,
  Terminal,
  Volume2,
  VolumeX,
  Send,
  Check,
  Github,
  Linkedin,
  Flame,
  Info,
  ExternalLink,
} from "lucide-react";

const BOOT_MESSAGES = [
  "INITIALIZING PREETI.exe CORE INTERFACE...",
  "Loading Robotics Middleware Stack (ROS2 Foxy Node-Ring)...",
  "Initializing PhysX Physics Rigid Body Solvers...",
  "Accluding LiDAR Odometry Calibration sweeps...",
  "Synthesizing Embodied AI Reinforcement policy registers...",
  "Asynchronous telemetry packet links: STABLE",
  "PREETI.exe KERNEL INITIALIZED [CLASS-S OPERATIONAL STATUS]",
];

export default function App() {
  // Boot States
  const [bootIdx, setBootIdx] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootFinished, setBootFinished] = useState(false);
  const [systemEntered, setSystemEntered] = useState(false);

  // Audio state
  const [muted, setMuted] = useState(true);

  // Contact / transmission states
  const [senderDesignation, setSenderDesignation] = useState("");
  const [messagePayload, setMessagePayload] = useState("");
  const [transmissionStatus, setTransmissionStatus] = useState<
    "idle" | "sending" | "success"
  >("idle");
  const [transmissionProgress, setTransmissionProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  // Auto-typing boot sequence
  useEffect(() => {
    if (bootIdx < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setBootLines((prev) => [...prev, BOOT_MESSAGES[bootIdx]]);
        setBootIdx((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setBootFinished(true);
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [bootIdx]);

  // Handle system initiation click
  const handleEnterSystem = () => {
    try {
      setMuted(false);
      audioSystem.enabled = true;
      audioSystem.systemBoot();
      audioSystem.toggleBackgroundHum(true);
    } catch (e) {
      console.warn(e);
    }
    setSystemEntered(true);
  };

  // Toggle audio status
  const handleToggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    audioSystem.toggleBackgroundHum(!nextMute);
    audioSystem.tapClick();
  };

  // Run contact form submission
  const handleTransmitBeacon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderDesignation || !messagePayload) {
      audioSystem.warningBeep();
      return;
    }

    audioSystem.tapClick();
    setTransmissionStatus("sending");
    setTransmissionProgress(15);

    // Simulate sending packet telemetry signals
    const interval = setInterval(() => {
      setTransmissionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTransmissionStatus("success");
          audioSystem.nodeUnlock();
          return 100;
        }
        return prev + 17;
      });
    }, 150);
  };

  const resetTransmission = () => {
    audioSystem.tapClick();
    setSenderDesignation("");
    setMessagePayload("");
    setTransmissionStatus("idle");
    setTransmissionProgress(0);
  };

  // Scroll to section helper
  const scrollToAnchor = (id: string) => {
    audioSystem.tapClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const allSections = [
    {
      name: "CHARACTER SYSTEM METRICS",
      id: "character-stats-anchor",
      data: <CharacterStats />,
      icon: Cpu,
    },
    {
      name: "ROBOTICS LAB SIMULATORS",
      id: "robotics-lab-anchor",
      data: <RoboticsLab />,
      icon: Layers,
    },
    {
      name: "KNOWLEDGE GRAPH",
      id: "knowledge-graph-anchor",
      data: <KnowledgeGraph />,
      icon: Map,
    },
    {
      name: "SKILL TREE",
      id: "skill-tree-anchor",
      data: <SkillTree />,
      icon: Network,
    },
    {
      name: "ACTIVE QUESTS",
      id: "active-quests-anchor",
      data: <ActiveQuests />,
      icon: Target,
    },
    {
      name: "TIMELINE LOGS",
      id: "timeline-logs-anchor",
      data: <MissionLogs />,
      icon: Calendar,
    },
    {
      name: "RESEARCH INTERESTS",
      id: "research-interests-anchor",
      data: <ResearchInterests />,
      icon: Atom,
    },
    {
      name: "MEDIA SHOWCASE",
      id: "media-showcase-anchor",
      data: <MediaShowcase />,
      icon: Video,
    },
    {
      name: "TERMINAL INTERACTIVE",
      id: "terminal-interactive-anchor",
      data: <TerminalPanel />,
      icon: Terminal,
    },
  ];

  // Main system bootloader overlay
  if (!systemEntered) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center relative p-6 overflow-hidden font-mono">
        <HologramCanvas />

        {/* Background Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] immersive-scanline-backdrop z-10" />

        {/* Global UI Frame */}
        {/* <div className="absolute inset-0 border border-[#00d2ff1a] m-4 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
        </div> */}

        {/* Cinematic Scanline sweep */}
        <div className="absolute inset-x-0 h-[1.5px] bg-[#00d2ff1a] shadow-[0_0_8px_rgba(0,210,255,0.5)] animate-scan z-20 pointer-events-none" />

        <div className="max-w-xl w-full bg-[#12121a]/90 border border-[#00d2ff33] rounded-sm p-6 md:p-8 backdrop-blur-md relative z-30">
          {/* Hardware indicators decals */}
          <div className="flex items-center justify-between border-b border-[#00d2ff1a] pb-4 mb-4 select-none">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#00d2ff] animate-pulse" />
              <span className="text-xs text-[#00d2ff] tracking-wider">
                BOOT_PROCESSOR v2.026.06
              </span>
            </div>
            <span className="text-[9px] text-[#00d2ff]/40">SYSTEM: ONLINE</span>
          </div>

          {/* Typing stdout logs lines list */}
          <div className="space-y-2.5 h-44 overflow-y-auto pr-1 scrollbar-thin">
            {bootLines.map((line, i) => (
              <div
                key={i}
                className="text-xs text-[#00d2ff]/80 leading-relaxed flex items-center gap-1.5 font-mono"
              >
                <span className="text-[#00d2ff] font-bold">&gt;</span>
                <span>{line}</span>
              </div>
            ))}
            {!bootFinished && (
              <span className="inline-block w-1.5 h-3.5 bg-[#00d2ff] blink" />
            )}
          </div>

          {/* Action unlock enter point button */}
          {bootFinished && (
            <div className="mt-8 space-y-4 animate-fade-in text-center">
              <div className="border-t border-[#00d2ff1a] pt-4 mb-4">
                <h1 className="text-lg md:text-xl font-bold tracking-widest text-[#00d2ff] uppercase glow-cyan">
                  PREETI.exe INITIALIZED
                </h1>
                <p className="text-[10px] text-slate-400 tracking-wide mt-1.5">
                  Robotics Engineer | Embodied AI Explorer | Systems Programmer
                </p>
                <p className="text-[10px] text-slate-500 mt-2 italic font-sans max-w-sm mx-auto">
                  "Current Mission: Building intelligent robotic systems using
                  simulation, autonomy and learning."
                </p>
              </div>

              <button
                onClick={handleEnterSystem}
                className="px-6 py-2.5 bg-[#00d2ff1a] border border-[#00d2ff] hover:bg-[#00d2ff33] hover:text-[#00d2ff] text-[#00d2ff] font-mono text-xs uppercase cursor-pointer select-none rounded-sm tracking-widest transition-all shadow-[0_0_15px_rgba(0,210,255,0.2)] animate-pulse"
                id="enter-system-node-btn"
              >
                [ ENTER SYSTEM ]
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // CORE SYSTEMS PORTAL DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 relative pb-12 font-sans overflow-x-hidden selection:bg-[#00d2ff]/25 selection:text-[#00d2ff]">
      {/* Immersive interactive particle canvas background */}
      <HologramCanvas />

      {/* Background Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] immersive-scanline-backdrop z-10" />

      {/* Global UI Frame */}
      {/* <div className="fixed inset-0 border border-[#00d2ff1a] m-4 pointer-events-none z-50">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d2ff] shadow-[0_0_8px_#00d2ff]"></div>
      </div> */}

      {/* Cyber overlay textures scanlines */}
      <div className="absolute inset-x-0 h-[1.5px] bg-[#00d2ff]/5 shadow-[0_0_12px_rgba(0,210,255,0.3)] animate-scan z-15 pointer-events-none" />

      {/* FIXED HEADER SYSTEM HUD BAR */}
      <header className="sticky top-0 bg-[#0c0c10]/90 border-b border-[#00d2ff1a] px-4 md:px-10 py-3.5 flex items-center justify-between z-40 backdrop-blur-md">
        <div className="flex items-center gap-4 select-none text-left">
          <div className="w-3 h-3 bg-[#00d2ff] animate-pulse rounded-full shadow-[0_0_10px_#00d2ff]"></div>
          <div className="flex flex-col">
            <h1 className="font-mono text-base md:text-lg font-bold tracking-tighter text-[#00d2ff]">
              PREETI.exe{" "}
              <span className="text-slate-600 font-light text-xs ml-1.5 font-sans italic">
                v2.0.4-STABLE
              </span>
            </h1>
            <span className="text-[9px] text-[#00d2ff]/50 uppercase font-mono tracking-wider font-semibold">
              Robotics Autonomy Mission Control
            </span>
          </div>
        </div>

        {/* Global Sound Toggles in Header */}
        <div className="flex items-center gap-3">
          {/* Quick social jump matrices */}
          <div className="flex items-center gap-2 pr-3 border-r border-[#00d2ff1a]">
            <a
              href="mailto:dudi.preeti.official@gmail.com"
              className="text-slate-400 hover:text-[#00d2ff] transition-colors"
              title="Transmitter Email address"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-[#00d2ff] transition-colors"
              title="Robotic Github Repos"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-[#00d2ff] transition-colors"
              title="Secure LinkedIn Link"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={handleToggleMute}
            className={`p-1.5 border rounded cursor-pointer select-none transition-colors ${
              muted
                ? "border-rose-500/20 text-rose-400/60 bg-rose-950/5"
                : "border-[#00d2ff]/30 text-[#00d2ff] bg-[#00d2ff]/10"
            }`}
            title={
              muted ? "Enable high-tech synthesiser beeps" : "Mute sound engine"
            }
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
        {/* LEFT NAV PANEL STATIONS FLOATER (3 cols on desktop) */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6 h-fit bg-[#12121a]/85 border border-[#ffffff0a] p-4 rounded-sm backdrop-blur-md">
          {/* Engineer Avatar & stats mini decal */}
          <div className="text-center pb-4 border-b border-[#00d2ff1a]">
            <div className="w-16 h-16 rounded-full border-2 border-[#00d2ff] flex items-center justify-center mx-auto bg-[#0a0a0c] text-[#00d2ff] font-mono font-bold text-lg select-none relative shadow-[0_0_15px_rgba(0,210,255,0.15)] animate-pulse">
              [ P ]
              <div className="absolute -bottom-1 -right-1 bg-[#00d2ff] text-slate-950 text-[8px] px-1 rounded-sm border border-[#0a0a0c]">
                M.TECH
              </div>
            </div>
            <h2 className="font-mono text-sm font-semibold tracking-tight mt-3 text-slate-100 uppercase glow-cyan">
              PREETI
            </h2>
            <p className="text-[10px] text-[#00d2ff]/75 font-mono mt-0.5 uppercase tracking-wide">
              EMBODIED AI ENGINEER
            </p>
          </div>

          {/* Scrolling anchors index navigation buttons */}
          <div className="space-y-1.5 select-none font-mono">
            <span className="text-[9px] text-[#00d2ff]/40 uppercase tracking-widest block mb-2 pl-1.5">
              TELEMETRY_INDEX:
            </span>

            {allSections.map((nav) => (
              <button
                key={nav.id}
                onClick={() => setCurrentSection(nav.id)}
                className="w-full text-left px-3 py-2 border border-transparent rounded-sm hover:border-[#00d2ff1a] hover:bg-[#00d2ff05] text-xs font-mono text-slate-400 hover:text-[#00d2ff] flex items-center gap-2.5 transition-all select-none cursor-pointer"
              >
                <nav.icon className="w-3.5 h-3.5 text-[#00d2ff]/50" />
                <span>{nav.name}</span>
              </button>
            ))}
          </div>

          {/* Operational systems specs HUD */}
          <div className="border-t border-[#00d2ff1a] pt-4 flex flex-col justify-between text-[10px] text-[#00d2ff]/50 font-mono">
            <span className="flex items-center justify-between">
              COHERENCE:{" "}
              <span className="text-emerald-400 font-semibold uppercase animate-pulse">
                OPTIM_SECTOR_7
              </span>
            </span>
            <span className="flex items-center justify-between mt-1">
              SENSORS:{" "}
              <span className="text-[#00d2ff] font-semibold uppercase">
                ACTIVE_400Hz
              </span>
            </span>
          </div>
        </aside>

        {/* GENERAL CONTENT DEEP SHEETS (9 cols on desktop) */}
        <main className="lg:col-span-9 space-y-12">
          {/* CORE OVERVIEW BANNER */}
          <section
            id="system-hud-overview"
            className="bg-[#12121a]/90 border border-[#00d2ff1a] rounded-sm p-5 md:p-6 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-[0.03] pointer-events-none">
              <Cpu className="w-32 h-32 text-[#00d2ff]" />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#00d2ff1a] pb-4 gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded border border-[#00d2ff33] text-[#00d2ff] bg-[#00d2ff0d] font-mono text-[9px] font-bold uppercase tracking-widest select-none">
                    ENGINEERING SYSTEM HOST ACTIVE
                  </span>
                  <h1 className="text-2xl font-bold font-mono tracking-tight text-[#00d2ff] mt-2">
                    PREETI // ROBOTICS & EMBODIED AI OS
                  </h1>
                </div>
                <div className="flex flex-col shrink-0 text-left md:text-right text-xs font-mono">
                  <span className="text-[#00d2ff]">
                    LOCAL_CLOCK: 2026-06-02
                  </span>
                  <span className="text-slate-500 mt-0.5">
                    LOCATION: CLOUD_RUN_CONTAINER
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#00d2ff] font-mono tracking-widest font-bold uppercase block select-none">
                    Primary Mission:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Fusing physics-driven simulation parameters, digital twin
                    environments, and machine learning models to solve complex
                    real-world continuous control and grasping maneuvers.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#00d2ff] font-mono tracking-widest font-bold uppercase block select-none">
                    Specialization focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "ROS2 Middleware",
                      "Cartographer SLAM",
                      "NVIDIA Isaac Sim",
                      "Trajectory Tracking",
                      "Imitation Policies",
                    ].map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-0.5 rounded bg-[#00d2ff1a] border border-[#00d2ff44] text-[#00d2ff] font-mono text-[9px]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#00d2ff] font-mono tracking-widest font-bold uppercase block select-none">
                    M.Tech telemetry:
                  </span>
                  <div className="p-3 bg-[#050507] border border-[#00d2ff1a] rounded font-mono text-[9.5px] leading-relaxed text-slate-400 space-y-1 shadow-[inset_0_0_10px_rgba(0,210,255,0.02)]">
                    <div className="flex justify-between">
                      <span>M.Tech Sector:</span>
                      <span className="text-[#00d2ff] font-semibold">
                        ROBOTICS REGISTRY
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coherence state:</span>
                      <span className="text-emerald-400 flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />{" "}
                        OPTIMAL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {allSections.map((section) => {
            if (currentSection && currentSection === section.id) {
              return (
                <section key={section.id} id={section.id} className="space-y-4">
                  <div className="flex items-center gap-2 select-none border-b border-[#00d2ff1a] pb-2">
                    <section.icon className="w-5 h-5 text-[#00d2ff]" />
                    <h3 className="font-mono text-xs font-semibold tracking-wider text-[#00d2ff] uppercase">
                      {section.name}
                    </h3>
                  </div>
                  {section.data}
                </section>
              );
            }
          })}

          {/* SECURE PACKET TRANSMISSION CONTACT BEACON FRAME */}
          <section
            id="contact-beacons-transceiver"
            className="bg-[#12121a]/95 border border-[#00d2ff1a] rounded-sm p-5 md:p-6 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 select-none pointer-events-none font-mono text-[9px] text-[#00d2ff]/30">
              SYS_TRANSCEIVER_B4
            </div>

            <div className="max-w-xl mx-auto space-y-4">
              <div className="text-center">
                <span className="px-2.5 py-0.5 rounded bg-[#00d2ff1a] border border-[#00d2ff44] text-[#00d2ff] font-mono text-[9px] font-bold uppercase tracking-wider select-none">
                  SECURE BEACON TRANSMITTER GATEWAY
                </span>
                <h3 className="font-mono text-sm font-semibold text-slate-100 tracking-tight mt-1.5 uppercase">
                  INITIATE DIRECTIONAL TRANSMISSION LINK
                </h3>
                <p className="text-[10px] text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed font-sans">
                  Use this terminal to encrypt and upload secure telemetry
                  coordinates straight to Preeti's register mailbox.
                </p>
              </div>

              {transmissionStatus === "idle" && (
                <form
                  onSubmit={handleTransmitBeacon}
                  className="space-y-4 pt-1 text-xs"
                >
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[#00d2ff] uppercase tracking-wider block font-semibold">
                      Sender Designation Coordinates (Email):
                    </label>
                    <input
                      type="email"
                      required
                      value={senderDesignation}
                      onChange={(e) => setSenderDesignation(e.target.value)}
                      placeholder="e.g. operator@mainframe.net"
                      className="w-full bg-[#050507] border border-[#ffffff1a] focus:border-[#00d2ff] outline-none p-2.5 rounded-sm font-mono text-slate-200 text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[#00d2ff] uppercase tracking-wider block font-semibold">
                      Transmission Packet Payload (Message):
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={messagePayload}
                      onChange={(e) => setMessagePayload(e.target.value)}
                      placeholder="Input encrypted core instruction blocks payload..."
                      className="w-full bg-[#050507] border border-[#ffffff1a] focus:border-[#00d2ff] outline-none p-2.5 rounded-sm font-sans text-slate-200 text-xs transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00d2ff1a] hover:bg-[#00d2ff33] border border-[#00d2ff] text-[#00d2ff] hover:text-white font-mono font-bold text-xs uppercase cursor-pointer select-none rounded-sm tracking-widest flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,210,255,0.15)] transition-all"
                  >
                    <Send className="w-4 h-4 animate-pulse shrink-0" />
                    <span>TRANSMIT_SECURE_BEACON</span>
                  </button>
                </form>
              )}

              {transmissionStatus === "sending" && (
                <div className="py-8 space-y-4 text-center font-mono">
                  <span className="text-[10px] text-[#00d2ff] animate-pulse block uppercase tracking-widest">
                    ENCRYPTING AND TRANSMITTING TELESIGNALS PACKET...
                  </span>

                  {/* Progress bar visual loader */}
                  <div className="max-w-xs mx-auto bg-[#050507] rounded h-2 overflow-hidden border border-[#ffffff0a] relative">
                    <div
                      className="bg-[#00d2ff] h-full absolute left-0 transition-all duration-150"
                      style={{ width: `${transmissionProgress}%` }}
                    />
                  </div>

                  <span className="text-[9px] text-[#00d2ff]/50 block">
                    Telemetry: RESOLVING {transmissionProgress}% STRENGTH
                  </span>
                </div>
              )}

              {transmissionStatus === "success" && (
                <div className="py-6 space-y-4 text-center font-mono animate-fade-in">
                  <div className="w-10 h-10 rounded-full border border-emerald-400 bg-emerald-950/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <Check className="w-5 h-5 animate-bounce" />
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-emerald-400 font-bold uppercase tracking-wider text-xs">
                      BEACON PACKET UPLOAD RECIPIENT COMPLETED!
                    </h5>
                    <p className="text-[10px] text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                      Secure packet uploaded in 1.4 seconds. Credentials
                      registered. Core recipient inbox notified at{" "}
                      <strong>dudi.preeti.official@gmail.com</strong>.
                    </p>
                  </div>

                  <button
                    onClick={resetTransmission}
                    className="mt-2 px-3 py-1.5 border border-[#00d2ff1a] bg-[#00d2ff10] hover:border-[#00d2ff] text-[10px] text-[#00d2ff] hover:text-white uppercase rounded-sm cursor-pointer select-none transition-colors"
                  >
                    TRANSMIT_ANOTHER_PACKET
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER BAR */}
      <footer className="mt-16 bg-[#0c0c10] border-t border-[#00d2ff1a] py-6 flex flex-col md:flex-row items-center justify-between px-10 text-[9px] font-mono text-slate-500 uppercase tracking-widest select-none gap-2">
        <div className="flex gap-4">
          <span>COORDINATES: 18.52° N, 73.85° E</span>
          <span className="text-[#00d2ff1d]">|</span>
          <span>ENV: ISAAC_SIM_4.0</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>{" "}
            SYSTEM_OK
          </span>
          <span className="text-slate-700">v0.2.1-preeti-alpha</span>
        </div>
      </footer>
    </div>
  );
}
