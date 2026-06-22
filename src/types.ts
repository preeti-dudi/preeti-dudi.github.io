export interface StatInfo {
  name: string;
  value: number;
  max: number;
  tagline: string;
  color: string;
}

export type SkillCategory = 'Software Engineering' | 'Robotics' | 'AI' | 'Simulation';

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  requiredSkills: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  description: string;
  relatedTools: string[];
  relatedProjects: string[];
  relatedResearch: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
  active?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  type: 'Main Quest' | 'Side Quest' | 'Guild Mission' | 'Hidden Mission';
  description: string;
  progress: number; // 0 to 100
  status: 'active' | 'completed' | 'locked';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'CLASS-S';
  rewards: string[];
  dependencies?: string[];
}

export interface MissionLog {
  id: string;
  date: string;
  title: string;
  category: 'Guild Mission Log' | 'Side Quest Log';
  description: string;
  details: string[];
  expanded?: boolean;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  status: 'ONLINE' | 'ACTIVE' | 'TESTING' | 'COMPLETED';
  progress: number;
  tech: string[];
  description: string;
  longDescription: string;
  telemetrySource: string; // Type of custom telemetry to simulate
  imagePrompt?: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  tag: string;
  description: string;
  complexity: number; // percentage
  modules: string[];
}
