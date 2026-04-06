import React from 'react';
import { motion } from 'framer-motion';

const services =[
  {
    title: "AI & Machine Learning Solutions",
    description: "Building intelligent systems using machine learning, NLP, and local LLMs. Focused on real-world deployment, model integration, and scalable AI applications."
  },
  {
    title: "Backend & System Development",
    description: "Designing scalable backend systems with REST APIs, real-time data processing, and efficient database architectures for high-performance applications."
  },
  {
    title: "AI-Powered Applications",
    description: "Developing applications that integrate AI with user interaction, including voice-enabled assistants, automation systems, and intelligent workflows."
  }
]

const Services = () => (
  <section className="services">
    <h2>Services</h2>
    <div
      className="services-container card-container"
    >
      {services.map((service, index) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 * index }}
          key={index} className="service-card card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Services;
