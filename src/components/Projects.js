import React from 'react';
import { motion } from 'framer-motion';
// import './Projects.css';

const projects = [
  {
    title: "Task Management System",
    description: "Developed a comprehensive task management application featuring intuitive user interfaces and efficient task-tracking functionalities. Integrated a robust back-end using Node.js with TypeScript, providing secure authentication and seamless task CRUD operations.",
    link: "https://github.com/preeti-dudi/task-manager"
  },
  {
    title: "BnB Fashions",
    description: "Designed and developed a dynamic e-commerce platform using React, delivering a smooth and engaging user experience. Focused on responsiveness, secure payment integrations, and product management for a seamless online shopping experience.",
    link: "https://bnbfashions.com"
  },
  {
    title: "Personal Portfolio",
    description: "Created a professional portfolio website using React, highlighting my skills, projects, and work experiences. The site showcases a modern design, animated interactions, and is fully responsive, ensuring an optimal viewing experience on all devices.",
    link: "https://preeti-dudi.github.io"
  }
];

const Projects = () => (
  <section className="projects">
    <h2>Projects</h2>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="projects-container card-container"
    >
      {projects.map((project, index) => (
        <div key={index} className="project-card card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className='app-button'>
            View Project
          </a>
        </div>
      ))}
    </motion.div>
  </section>
);

export default Projects;
