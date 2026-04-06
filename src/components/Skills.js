import React from 'react';
import { FaReact, FaNodeJs, FaLaravel, FaJava, FaPhp } from 'react-icons/fa';
// import './Skills.css';
import { motion } from 'framer-motion';
import { SiExpress, SiGit, SiMongodb } from 'react-icons/si';
import { BsDatabase } from 'react-icons/bs';
import { TbBrandReactNative } from 'react-icons/tb';

const skills = [
  {
    domain: "Programming Languages",
    items: ["Python", "C", "MATLAB", "JavaScript", "PHP"]
  },
  {
    domain: "Machine Learning & AI",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing (NLP)",
      "Embeddings & Similarity Models",
      "Reinforcement Learning"
    ]
  },
  {
    domain: "Frameworks & Libraries",
    items: [
      "PyTorch",
      "OpenCV",
      "Hugging Face Transformers"
    ]
  },
  {
    domain: "AI Tools & Platforms",
    items: [
      "Ollama (LLaMA3)",
      "Coqui TTS (XTTS-v2)"
    ]
  },
  {
    domain: "Robotics & Simulation",
    items: [
      "ROS2",
      "Gazebo",
      "Path Planning",
      "Kinematics"
    ]
  },
  {
    domain: "Backend & Systems",
    items: [
      "REST APIs",
      "Database Optimization",
      "Real-time Data Processing",
      "Queues & Schedulers",
      "System Design"
    ]
  },
  {
    domain: "Frontend & Web",
    items: [
      "React.js",
      "HTML",
      "CSS",
      "REST API Integration"
    ]
  },
  {
    domain: "Tools & Platforms",
    items: [
      "Git",
      "Linux",
      "Unity (VR)"
    ]
  }
];;

const Skills = () => (
  <section className="skills">
    <h2>Skills</h2>
    <div
      className="card-container center-text"
    >
      {skills.map((skill, index) => (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{  stiffness: 100, delay: 0.2 * index}}
          key={index} className="card">
          <h3>{skill.domain}</h3>
          <p>{skill.items.join(', ')}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
