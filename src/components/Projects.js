import React from 'react';
import { motion } from 'framer-motion';
// import './Projects.css';

const projects = [
  {
    title: "Task Management System",
    description: "Developed a comprehensive task management application featuring intuitive user interfaces and efficient task-tracking functionalities. Integrated a robust back-end using Node.js with TypeScript, providing secure authentication and seamless task CRUD operations.",
    link: "https://preeti-dudi.github.io/TaskManagement/"
  },
  {
    title: "Educasy",
    description: "Designed and developed a dummy digital learning platform using React, delivering a smooth and engaging user experience. Focused on responsiveness, modern, and extensive for a seamless user experience.",
    link: "https://preeti-dudi.github.io/educasy/"
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
