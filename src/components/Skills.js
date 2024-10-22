import React from 'react';
import { FaReact, FaNodeJs, FaLaravel, FaJava, FaPhp } from 'react-icons/fa';
// import './Skills.css';
import { motion } from 'framer-motion';
import { SiExpress, SiGit, SiMongodb } from 'react-icons/si';
import { BsDatabase, BsGit } from 'react-icons/bs';
import { TbBrandReactNative } from 'react-icons/tb';

const skills = [
  {
    icon: <SiMongodb />,
    text: "Mongo"
  },
  {
    icon: <SiExpress />,
    text: "Express"
  },
  {
    icon: <FaReact />,
    text: "React"
  },
  {
    icon: <FaNodeJs />,
    text: "Node.js"
  },
  {
    icon: <FaLaravel />,
    text: "Laravel"
  },
  {
    icon: <BsDatabase />,
    text: "MySQL"
  },
  {
    icon: <TbBrandReactNative />,
    text: "React Native"
  },
  {
    icon: <SiGit />,
    text: "Git"
  },
  {
    icon: <FaJava />,
    text: "JavaScript"
  },
  {
    icon: <FaPhp />,
    text: "PHP"
  },

];

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
          <span className='big-icon'>{skill.icon}</span>
          <p>{skill.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
