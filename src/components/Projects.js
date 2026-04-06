import { motion } from 'framer-motion';

const projects = [
  {
    title: "Dexa – AI Task Manager with Voice Assistant",
    description: "Built a local-first AI assistant capable of managing tasks through voice and text interaction. Integrated LLaMA3 via Ollama for offline intelligence and Coqui TTS for natural voice output, enabling a fully functional AI assistant without cloud dependency.",
    link: "https://github.com/preeti-0001/dexa"
  },
  {
    title: "JAM Paper Replication (Just Ask for Music)",
    description: "Replicated a research paper model for query-based music retrieval using NLP and embedding-based similarity. Trained and evaluated the model, and integrated it into Dexa for real-world usage.",
    link: ""
  },
  {
    title: "Cognitive Load Estimation using Pupilometry",
    description: "Developed a computer vision system using OpenCV to estimate cognitive load based on pupil dynamics under controlled lighting. Implemented detection, segmentation, and feature extraction pipeline for real-time analysis.",
    link: "https://github.com/preeti-0001/Cognitive-Load-Estimation-using-Red-Light-Pupilometry"
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
