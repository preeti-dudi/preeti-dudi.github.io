import { 
  StatInfo, 
  SkillNode, 
  GraphNode, 
  GraphEdge, 
  Quest, 
  MissionLog, 
  ProjectData, 
  ResearchInterest 
} from './types';

export const CHARACTER_STATS: StatInfo[] = [
  { name: 'Robotics', value: 72, max: 100, tagline: 'Kinematics & Control Systems', color: 'cyan' },
  { name: 'Simulation', value: 68, max: 100, tagline: 'Physics-based Digital Twins', color: 'blue' },
  { name: 'ROS2', value: 61, max: 100, tagline: 'Middleware & Nodes Network', color: 'cyan' },
  { name: 'Computer Vision', value: 55, max: 100, tagline: 'Visual Odometry & Perceptions', color: 'orange' },
  { name: 'Full Stack', value: 74, max: 100, tagline: 'System HUDs & Cloud API pipelines', color: 'blue' },
  { name: 'Research', value: 49, max: 100, tagline: 'Academic Literature & Benchmarking', color: 'orange' },
  { name: 'Communication', value: 58, max: 100, tagline: 'Cross-Disciplinary Telemetry', color: 'cyan' },
];

export const SKILL_TREE_NODES: SkillNode[] = [
  // Software Engineering
  { id: 'js', name: 'JS/TS', category: 'Software Engineering', description: 'Asynchronous event engines and object structures', level: 3, maxLevel: 3, unlocked: true, requiredSkills: [] },
  { id: 'react', name: 'React SPA', category: 'Software Engineering', description: 'Functional components and reactive telemetry displays', level: 3, maxLevel: 3, unlocked: true, requiredSkills: ['js'] },
  { id: 'backend', name: 'Backend Services', category: 'Software Engineering', description: 'Secure controllers, micro-service routes and socket gateways', level: 2, maxLevel: 3, unlocked: true, requiredSkills: ['js'] },
  { id: 'apis', name: 'REST/gRPC APIs', category: 'Software Engineering', description: 'Synchronized low-latency cloud data protocols', level: 3, maxLevel: 3, unlocked: true, requiredSkills: ['backend'] },

  // Robotics
  { id: 'ros2', name: 'ROS2 Framework', category: 'Robotics', description: 'Subscribers, publishers, and custom message nodes', level: 2, maxLevel: 3, unlocked: true, requiredSkills: [] },
  { id: 'slam', name: 'SLAM Systems', category: 'Robotics', description: 'Simultaneous Localization and Mapping using LiDAR and Odometry', level: 1, maxLevel: 3, unlocked: true, requiredSkills: ['ros2'] },
  { id: 'planning', name: 'Path Planning', category: 'Robotics', description: 'A*, Dijkstra, and Dynamic Window obstacles routing', level: 2, maxLevel: 3, unlocked: true, requiredSkills: ['ros2'] },
  { id: 'isaac_sim_rob', name: 'Isaac Sim Integration', category: 'Robotics', description: 'Deploying autonomous code from simulation environments', level: 2, maxLevel: 3, unlocked: true, requiredSkills: ['planning'] },
  { id: 'gazebo', name: 'Gazebo Physics', category: 'Robotics', description: 'SDF environmental builds and ODE dynamic simulations', level: 2, maxLevel: 3, unlocked: true, requiredSkills: ['ros2'] },

  // AI
  { id: 'ml', name: 'Machine Learning', category: 'AI', description: 'Neural systems, classification layers and cost regression', level: 2, maxLevel: 3, unlocked: true, requiredSkills: [] },
  { id: 'rl', name: 'Reinforcement Learning', category: 'AI', description: 'PPO, SAC, and Policy Gradient algorithms in gym configurations', level: 1, maxLevel: 3, unlocked: true, requiredSkills: ['ml'] },
  { id: 'cloning', name: 'Behavior Cloning', category: 'AI', description: 'Imitation learning on human datasets and teleoperation inputs', level: 1, maxLevel: 3, unlocked: true, requiredSkills: ['ml'] },
  { id: 'vision', name: 'Robot Vision', category: 'AI', description: 'YOLO object markers, depth estimation, and optical flow estimation', level: 2, maxLevel: 3, unlocked: true, requiredSkills: ['ml'] },

  // Simulation
  { id: 'isaac_sim', name: 'NVIDIA Isaac Sim', category: 'Simulation', description: 'PhysX-driven high fidelity sensor emulators', level: 2, maxLevel: 3, unlocked: true, requiredSkills: [] },
  { id: 'omniverse', name: 'NVIDIA Omniverse', category: 'Simulation', description: 'USD pipeline standards and multi-machine scene composition', level: 1, maxLevel: 3, unlocked: true, requiredSkills: ['isaac_sim'] },
  { id: 'unity_vr', name: 'Unity VR Simulation', category: 'Simulation', description: 'Tactile controllers interface and 3D teleoperation headsets', level: 2, maxLevel: 3, unlocked: true, requiredSkills: [] },
  { id: 'digital_twins', name: 'Digital Twins', category: 'Simulation', description: 'Full physical environment mapping and asynchronous telemetry mirrors', level: 1, maxLevel: 3, unlocked: true, requiredSkills: ['omniverse'] },
];

export const KNOWLEDGE_GRAPH_DATA: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    { 
      id: 'ros2', 
      label: 'ROS2 Middleware', 
      x: 0, 
      y: 0, 
      description: 'The computational graph architecture establishing the communication gateway between nodes, hardware interfaces, and path-planners.',
      relatedTools: ['RCLPY', 'Rcpp', 'Colcon', 'Rviz'],
      relatedProjects: ['Quadcopter Control Node', '2-Wheel Differential Robot'],
      relatedResearch: ['Autonomous Navigating Agents', 'Real-time Telemetry Streams']
    },
    { 
      id: 'slam', 
      label: 'LiDAR SLAM', 
      x: -120, 
      y: -90, 
      description: 'Simultaneous Localization and Mapping. Processing LiDAR sweeps and visual odometry data to form laser-scan occupancy grids with Nav2.',
      relatedTools: ['Cartographer', 'SLAM Toolbox', 'PCAP Datasets'],
      relatedProjects: ['SLAM Robot Mapping Unit', 'Quadcopter Visual Odometry'],
      relatedResearch: ['Simulation-to-Real Map Corrections']
    },
    { 
      id: 'behavior-cloning', 
      label: 'Behavior Cloning', 
      x: 140, 
      y: -80, 
      description: 'Training deep neural networks on teleoperated demonstrations to map raw observations (RGB image/joint states) directly to command velocities.',
      relatedTools: ['PyTorch', 'Robomimic', 'ONNX Runtime'],
      relatedProjects: ['RoboCircuit Autonomous Assembler'],
      relatedResearch: ['Human-to-Robot Skill Transfer', 'Dexterous Manipulation Policy']
    },
    { 
      id: 'retargeting', 
      label: 'Kinematic Retargeting', 
      x: 200, 
      y: 70, 
      description: 'Translating human skeleton coordinates (from VR or optical trackers) into targeted joint configurations of articulated robotic structures.',
      relatedTools: ['URDF parser', 'Pink IK solver', 'KDL'],
      relatedProjects: ['Pupilometry Spatial Target Tracker'],
      relatedResearch: ['Human-Robot Co-existing Tasks', 'Dexterous Manipulation']
    },
    { 
      id: 'isaac-sim', 
      label: 'NVIDIA Isaac Sim', 
      x: -60, 
      y: 110, 
      description: 'Next-generation photorealistic simulation leveraging PhysX and RTX to synthesize sensors, cameras, and joint physics accurately.',
      relatedTools: ['Omniverse Kit', 'USD Composer', 'Isaac Lab'],
      relatedProjects: ['2-Wheel Robot Sandbox Environment'],
      relatedResearch: ['Simulation-to-Real Transfer Pipelines', 'Digital Twins']
    },
    { 
      id: 'gazebo', 
      label: 'Gazebo Physics', 
      x: -180, 
      y: 50, 
      description: 'Standard simulator supporting ODE, Bullet, and DART physics. Ideal for quick, automated ROS2 environment integration testing.',
      relatedTools: ['SDF specification', 'ROS Gazebo Plugins'],
      relatedProjects: ['Quadcopter Wind-Gust Tests', 'differential_drive node tests'],
      relatedResearch: ['Autonomous Flight Controllers']
    },
    { 
      id: 'rl', 
      label: 'Reinforcement Learning', 
      x: 80, 
      y: -150, 
      description: 'Fusing trial-and-error rewards inside physics engines to train locomotive and grasping patterns over millions of environment steps.',
      relatedTools: ['Stable Baselines3', 'Gymnasium', 'Ray RLlib'],
      relatedProjects: ['RoboCircuit Assembly Controller'],
      relatedResearch: ['Simulation-to-Real Transfer', 'Dexterous Manipulation']
    },
    { 
      id: 'vr', 
      label: 'VR Teleoperation', 
      x: 220, 
      y: -130, 
      description: 'Creating immersive virtual environments mirroring real robot feedback, enabling human operators to easily log training trajectories.',
      relatedTools: ['Unity Rendering', 'SteamVR SDK', 'ROSBridge Client'],
      relatedProjects: ['Educasy Tele-Education Robot'],
      relatedResearch: ['Human-Robot Interaction Interfaces']
    },
    { 
      id: 'planning', 
      label: 'Path Planning', 
      x: -240, 
      y: -80, 
      description: 'Global planning (A*, TEB Local Planner) constructing dynamic obstacle evasion vectors for differential drive systems.',
      relatedTools: ['NAV2 Server', 'Costmap2D', 'Dynamic Window Approach'],
      relatedProjects: ['2 Wheel Robot', 'SLAM Robot Navigation Unit'],
      relatedResearch: ['Autonomous Navigating systems']
    },
    { 
      id: 'manipulation', 
      label: 'Dexterous Grasping', 
      x: 100, 
      y: 130, 
      description: 'Multi-fingered control mechanics incorporating force-torque sensors and compliant feedback arrays for delicate robotic manipulation.',
      relatedTools: ['Tactile Array drivers', 'Bi-manual IK solvers'],
      relatedProjects: ['RoboCircuit Assembly Controller'],
      relatedResearch: ['Dexterous Manipulation', 'Human-to-Robot Skill Transfer']
    }
  ],
  edges: [
    { source: 'ros2', target: 'slam', active: true },
    { source: 'ros2', target: 'planning', active: true },
    { source: 'ros2', target: 'gazebo', active: false },
    { source: 'slam', target: 'planning', active: true },
    { source: 'isaac-sim', target: 'ros2', active: true },
    { source: 'isaac-sim', target: 'manipulation', active: true },
    { source: 'behavior-cloning', target: 'retargeting', active: true },
    { source: 'rl', target: 'behavior-cloning', active: false },
    { source: 'rl', target: 'manipulation', active: true },
    { source: 'vr', target: 'retargeting', active: true },
    { source: 'retargeting', target: 'manipulation', active: true },
    { source: 'gazebo', target: 'slam', active: false }
  ]
};

export const ACTIVE_QUESTS: Quest[] = [
  {
    id: 'main-quest',
    title: 'Cross-Embodiment Re-targeting Research',
    type: 'Main Quest',
    description: 'Deconstruct teleoperated human hand movements and retarget the positional vectors to various multi-fingered robotic grippers within NVIDIA Omniverse.',
    progress: 45,
    status: 'active',
    difficulty: 'CLASS-S',
    rewards: ['Unified URDF Retargeting Engine', 'Isaac Lab Trajectory Log System', '+1500 XP'],
    dependencies: ['Isaac Sim Mastery']
  },
  {
    id: 'side-quest-isaac',
    title: 'Isaac Sim Mastery',
    type: 'Side Quest',
    description: 'Construct complex factory-floor twin simulations with integrated dynamic obstacle pipelines and virtual LiDAR streaming parameters.',
    progress: 80,
    status: 'active',
    difficulty: 'HARD',
    rewards: ['USD Pipeline Toolkit', 'Photo-real Sensor Configs', '+800 XP']
  },
  {
    id: 'side-quest-nav',
    title: 'ROS2 Autonomous Navigation',
    type: 'Side Quest',
    description: 'Calibrate Odometry sensors and integrate SLAM Toolbox on dual-wheel chassis. Tune TEB local planners to bypass dynamic blockades.',
    progress: 95,
    status: 'active',
    difficulty: 'MEDIUM',
    rewards: ['Optimized Costmap Configuration', 'Nav2 Path Nodes', '+500 XP']
  },
  {
    id: 'guild-mission-ml',
    title: 'AI-ML Certification',
    type: 'Guild Mission',
    description: 'Pass the advanced training benchmarks in deep learning, regression layers, convolutional image patterns, and foundational ML policies.',
    progress: 100,
    status: 'completed',
    difficulty: 'EASY',
    rewards: ['Visual CNN Weight Decals', 'Deep Perception Certification', '+300 XP']
  },
  {
    id: 'hidden-quest-content',
    title: 'Building Content Mastery',
    type: 'Hidden Mission',
    description: 'Synthesize the boundary between robotics, computer-assisted tutorials, and hardware construction logs into highly visual developer writeups.',
    progress: 60,
    status: 'active',
    difficulty: 'HARD',
    rewards: ['Digital Twin Content Suite', 'Robotics Influence Blueprint', '+1000 XP']
  }
];

export const MISSION_LOGS: MissionLog[] = [
  // Guild Mission Logs
  {
    id: 'log1',
    date: 'Jul 2018',
    title: 'Initiated IT Engineering Terminal',
    category: 'Guild Mission Log',
    description: 'Enrolled in academic IT Engineering core. Established foundations in algorithmic calculations, compilation pipelines, and networking structures.',
    details: [
      'Engineered multi-threaded core concepts.',
      'Studied database models and structured database architectures.',
      'Calibrated local communication node experiments.'
    ]
  },
  {
    id: 'log2',
    date: 'Jan 2021',
    title: 'Software Development Deployment (Intern)',
    category: 'Guild Mission Log',
    description: 'Secured an industrial software engineering internship. Designed modern web APIs and modular frontend UI layouts inside production environments.',
    details: [
      'Developed and optimized React components.',
      'Integrated distributed cloud databases.',
      'Discovered modular systems development.'
    ]
  },
  {
    id: 'log3',
    date: 'May 2022',
    title: 'Compiled IT Engineering Degree',
    category: 'Guild Mission Log',
    description: 'Completed curriculum and emerged as a licensed IT Engineer. Excelled in analytical logic and embedded microcontrollers capstone.',
    details: [
      'Graduated with honors.',
      'Engineered interactive sensor reading units.',
      'Configured early robot kinematics simulations.'
    ]
  },
  {
    id: 'log4',
    date: 'May 2022',
    title: 'Software Development Core Engineer Job',
    category: 'Guild Mission Log',
    description: 'Earned full-time node contract at a fast-scaling tech enterprise. Implemented server-side controllers, API gateways, and advanced dashboard visual telemetry tools.',
    details: [
      'Authored secure and fast backend controllers.',
      'Deployed production services using CI/CD pipelines.',
      'Mentored incoming interns on modular code architecture.'
    ]
  },
  {
    id: 'log5',
    date: 'Aug 2024',
    title: 'Temporary Leave - Software Lab Sector',
    category: 'Guild Mission Log',
    description: 'Departed traditional web development role to initiate focused study into absolute automation, hardware mechanics, physics solvers, and spatial perception systems.',
    details: [
      'Began deeper investigation of robot kinematics.',
      'Compiled custom physical controller prototypes.',
      'Built custom linear actuator simulators.'
    ]
  },
  {
    id: 'log6',
    date: 'Mar 2025',
    title: 'Interim Software Engineering Contract',
    category: 'Guild Mission Log',
    description: 'Maintained core programming mastery by executing targeted software contracts while drafting academic thesis requirements.',
    details: [
      'Refined large-scale asynchronous React systems.',
      'Developed micro-graphs showing real-time event distributions.'
    ]
  },
  {
    id: 'log7',
    date: 'Aug 2025',
    title: 'Entered Robotics M.Tech Cyber-Sector',
    category: 'Guild Mission Log',
    description: 'Enrolled in specialized Masters program. Devoting physical CPU, brain power, and simulation environments to absolute mastery of Embodied AI and kinematic controls.',
    details: [
      'Constructing deep reinforcement learning environments.',
      'Implementing ROS2 communication maps across dynamic environments.',
      'Focusing thesis on Cross-Embodiment spatial coordinate conversions.'
    ]
  },

  // Side Quest Logs
  {
    id: 'side-log1',
    date: 'Sept 2024',
    title: 'Government Exam - Logical Stress Test',
    category: 'Side Quest Log',
    description: 'Attempted rigorous state-level computational and strategic selection exams to test fast-solving abilities under extreme stress curves.',
    details: [
      'Evaluated system speed, memory capacity, and algorithmic puzzle solving.'
    ]
  },
  {
    id: 'side-log2',
    date: 'Oct 2024',
    title: 'Educasy Prototype Launch',
    category: 'Side Quest Log',
    description: 'Assembled a fully integrated pedagogical spatial robot to bridge accessibility gaps with physical digital interaction.',
    details: [
      'Wrote modular web layouts paired with motor controllers.',
      'Constructed clean 3D physical chassis outlines.'
    ]
  },
  {
    id: 'side-log3',
    date: 'Nov 2024',
    title: 'RoboCircuit Core Prototype Phase',
    category: 'Side Quest Log',
    description: 'Created an intelligent web CAD interface assisting electronics designers to debug and layout multi-layered circuit pathways graphically.',
    details: [
      'Mapped graphic routing vectors over digital canvasses.',
      'Engineered auto-complete checks for sensor connectors.'
    ]
  },
  {
    id: 'side-log4',
    date: 'Dec 2024',
    title: 'Government Technical Job Quest',
    category: 'Side Quest Log',
    description: 'Pushed limits during government administrative selection stages to test application of engineering logic under regional structures.',
    details: [
      'Achieved upper-tier scores in logical structure examinations.'
    ]
  },
  {
    id: 'side-log5',
    date: 'Feb 2024',
    title: 'Clothing Store Digital Platform Experiment',
    category: 'Side Quest Log',
    description: 'Architected and launched a fully automated custom digital storefront to dissect logistic networks and direct consumer transactions.',
    details: [
      'Mapped real-time inventory systems.',
      'Programmed instant payment node gateways.'
    ]
  },
  {
    id: 'side-log6',
    date: 'Oct 2025',
    title: 'Pupilometry Precision Sensor Integration',
    category: 'Side Quest Log',
    description: 'Programmed an advanced vision mapping software to monitor and calculate human ocular expansion/contraction ratios to reflect active neurological load.',
    details: [
      'Programmed YOLO-based eye border tracking tools.',
      'Plotted minute pixel measurements to display fatigue spikes.'
    ]
  },
  {
    id: 'side-log7',
    date: 'Mar 2025',
    title: 'Quadcopter Autonomous Stabilization Unit',
    category: 'Side Quest Log',
    description: 'Compiled a firmware subsystem translating inertial measurement units (IMUs) feedback into instantaneous esc pulses to maintain absolute aerial equilibrium.',
    details: [
      'Created custom PID feedback controllers.',
      'Simulated air wind currents inside Gazebo nodes.'
    ]
  },
  {
    id: 'side-log8',
    date: 'Mar 2025',
    title: '2-Wheel Kinematics Robot Sandbox',
    category: 'Side Quest Log',
    description: 'Designed a dual-wheel differential-drive vehicle in solid hardware, utilizing encoder wheels to precisely log spatial movement maps.',
    details: [
      'Engineered forward/inverse odometry calculators.',
      'Synced mapping parameters directly to an Rviz screen.'
    ]
  }
];

export const ROBOTICS_LAB_PROJECTS: ProjectData[] = [
  {
    id: 'slam-robot',
    title: 'SLAM Differential Mobile Unit',
    category: 'Autonomous Odometry & Mapping',
    status: 'ONLINE',
    progress: 95,
    tech: ['ROS2', 'SLAM Toolbox', 'Cartographer', 'LiDAR', 'C++'],
    description: 'A hardware-bound autonomous exploration rover. Uses a 2D LiDAR spinner to feed range data into Gmapping, crafting high-fidelity 2D occupancy grid maps of indoor pathways.',
    longDescription: 'This module utilizes laser odometry combined with wheel relative transformations to balance state estimation errors. In simulation environments, Nav2 commands take goal coordinates to direct the machine safely around furniture, executing local path planners in under 12 milliseconds.',
    telemetrySource: 'slam-map'
  },
  {
    id: 'quadcopter',
    title: 'IMU Quadcopter Stabilization Unit',
    category: 'Inertial Controls & Physics',
    status: 'ACTIVE',
    progress: 88,
    tech: ['Gazebo', 'PID Controls', 'Esp32', 'Inertial Sensors', 'IMU'],
    description: 'Stablized airborne drone prototype using an array of proportional-integral-derivative filters that balance wind disturbances.',
    longDescription: 'Calculates roll, pitch, and yaw corrections at a 400Hz frequency loop. Telemetry monitors show exact gyroscope angular velocities mapped to motor voltage curves, maintaining hovering stability using solid physical parameters.',
    telemetrySource: 'pid-graph'
  },
  {
    id: '2-wheel-robot',
    title: '2-Wheel Encoder Differential Drive',
    category: 'Kinematics & Spatial Tracking',
    status: 'TESTING',
    progress: 90,
    tech: ['ROS2', 'Omniverse Isaac', 'Wheel Encoders', 'Urdf Node', 'Python'],
    description: 'An advanced dual-wheel robot configured with precise optical encoders to calculate exact dead-reckoning navigation coordinate fields.',
    longDescription: 'Created a highly detailed digital replica inside NVIDIA Omniverse Isaac Sim, allowing the real physical model and the simulated simulation model to feed back and forward in a unified digital-twin data loop.',
    telemetrySource: 'wheel-encoders'
  },
  {
    id: 'pupilometry',
    title: 'Ocular Load Pupil Tracker',
    category: 'Computer Vision & Deep Learning',
    status: 'COMPLETED',
    progress: 100,
    tech: ['OpenCV', 'PyTorch', 'MediaPipe', 'Feature Extraction', 'Python'],
    description: 'Visual tracking core calculating iris diameter adjustments in dark and bright stimulus, mapping mental task saturation levels in real-time.',
    longDescription: 'Using high-frequency optical frame capture, this project processes visual parameters to isolate pupil contours. Real-time graphs represent dynamic pupil dilation scales, which can be hooked into robotics training environments to scale task difficulty.',
    telemetrySource: 'iris-vision'
  },
  {
    id: 'educasy',
    title: 'Educasy - Spatial Interactive Robotics',
    category: 'Human-Robot Co-existence',
    status: 'ACTIVE',
    progress: 75,
    tech: ['React', 'ESP8266 WebSocket', '3D Frame Chassis', 'Node API'],
    description: 'Educational kinetic machine designed to display physical letters and visual blocks based on real-time commands from remote classrooms.',
    longDescription: 'Designed as a physical interactive companion, Educasy connects via low-latency WebSockets to mirror a customized educational web program. Kids manipulate mechanical knobs to communicate with the motorized core.',
    telemetrySource: 'socket-ping'
  },
  {
    id: 'robocircuit',
    title: 'RoboCircuit Visual Route Planner',
    category: 'UI CAD & Auto-Routing',
    status: 'ONLINE',
    progress: 92,
    tech: ['TypeScript', 'SVG Vectors', 'Vector Geometry', 'Local Storage'],
    description: 'An interactive browser CAD platform which models printed circuit elements and routes copper connections with logical routing rules.',
    longDescription: 'Includes dynamic route optimization vectors, path collision alerts, and standard component libraries. Highly efficient SVG renders allow full schematics to drag, snap, and compile to print-ready Gerber layout guides.',
    telemetrySource: 'cad-vector'
  }
];

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    id: 'embodied-ai',
    title: 'Embodied AI Systems',
    tag: 'INTELLIGENCE',
    description: 'Empowering physical neural nodes with real-world understanding by hooking advanced learning models (like Vision-Language-Action policies) directly into actuators.',
    complexity: 85,
    modules: ['Sensory-Action Loops', 'Visual Grounding', 'Task Planning Transformers']
  },
  {
    id: 'skill-transfer',
    title: 'Human-to-Robot Skill Transfer',
    tag: 'IMITATION_LEARNING',
    description: 'Mapping rich human motor trajectories recorded in VR or camera environments onto high-DOF robotic arms with kinematic transformations.',
    complexity: 92,
    modules: ['Action Retargeting solvers', 'Demonstration Pruning', 'Force-Compliance Mapping']
  },
  {
    id: 'dexterous-manipulation',
    title: 'Dexterous Manipulation Dynamics',
    tag: 'KINEMATICS',
    description: 'Advancing multi-joint robotic hands beyond simplistic claw grippers into delicate, multi-fingered active grasping using integrated tactile feedback arrays.',
    complexity: 98,
    modules: ['Friction-Cone Calculations', 'In-Hand Rotation Trajectories', 'Proximity Sensor Arrays']
  },
  {
    id: 'sim-to-real',
    title: 'Simulation-to-Real (Sim2Real) Transfer',
    tag: 'GENERALIZATION',
    description: 'Tackling the physics reality difference by injecting intense Domain Randomization (mass variances, friction sweeps, visual noise) during simulated training inside Isaac Sim.',
    complexity: 89,
    modules: ['Domain Randomization Engines', 'Friction Coefficients Calibration', 'Feedback Correction Weights']
  },
  {
    id: 'rl-grasping',
    title: 'Deep Reinforcement Learning policies',
    tag: 'POLICIES',
    description: 'Deploying continuous-action algorithm setups (Deep Q, PPO, DDPG) to solve robotic locomotion on jagged virtual landscapes directly in physics engines.',
    complexity: 90,
    modules: ['Reward-Shaping Multipliers', 'Action-Space Penalties', 'Stochastic Policy Networks']
  },
  {
    id: 'digital-twins',
    title: 'Real-time Digital Twins',
    tag: 'TELEMETRY',
    description: 'Directing industrial factory flow lines through unified USD asset models. Connecting live MQTT sensor hubs to mirror physical coordinates perfectly on screen.',
    complexity: 78,
    modules: ['Low Latency Sockets', 'Universal Scene Description (USD)', 'MQTT Telemetry Gateways']
  }
];

export const MEDIA_SHOWCASE_ITEMS = [
  {
    id: 'vid1',
    title: 'Sim2Real: Dexterous Hand grasping trajectory',
    source: 'Isaac Sim RTX Render Engine',
    duration: '01:45',
    category: 'Simulation',
    clicks: 1420,
    status: 'RENDERED',
    description: 'Visual walkthrough of trajectory retargeting from a visual hand-tracker onto a shadow-hand model inside Isaac Sim, showing force arrays.'
  },
  {
    id: 'vid2',
    title: 'Nav2 Local Obstacle TEB Controller tuning',
    source: 'Rviz Differential Rover Telemetry',
    duration: '02:30',
    category: 'Autonomous Navigation',
    clicks: 980,
    status: 'ACTIVE',
    description: 'Screen recordings of the real 2-wheel rover circumventing surprise obstacles placed in its laser path. Watch PID correction signals.'
  },
  {
    id: 'vid3',
    title: 'Building a custom Web-to-Hardware Companion',
    source: 'GitHub Hardware Logs Video Log #04',
    duration: '04:12',
    category: 'Tutorial/Vlog',
    clicks: 2110,
    status: 'ONLINE',
    description: 'Time-lapse of building the Educasy robotic prototype. Showcases component selections, soldering connections, and WebSockets calibration.'
  }
];
