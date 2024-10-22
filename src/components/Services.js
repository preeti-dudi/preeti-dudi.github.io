import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Web Development",
    description: "Specializing in building responsive and high-performance websites using modern JavaScript frameworks like React and Vue. I focus on creating user-friendly interfaces and scalable architectures, ensuring optimal performance across all devices."
  },
  {
    title: "Mobile App Development",
    description: "Experienced in developing cross-platform mobile applications using React Native. I build sleek, intuitive mobile apps tailored to meet user needs, ensuring a seamless experience on both iOS and Android platforms."
  },
  {
    title: "Backend Development",
    description: "Proficient in server-side development using Node.js and PHP (Laravel). I design robust APIs and manage databases like MySQL and MongoDB to provide secure, scalable, and efficient back-end solutions."
  },
  {
    title: "API Integration & Development",
    description: "Skilled in integrating third-party APIs, including payment gateways and external data sources, ensuring seamless functionality and data flow between systems. I can also create custom RESTful APIs for complex requirements."
  },
  {
    title: "E-Commerce Solutions",
    description: "Delivering full-fledged e-commerce platforms with secure payment integrations, custom shopping carts, and user management. My focus is on providing a smooth shopping experience, optimizing for conversions and scalability."
  },
  {
    title: "Software Consulting",
    description: "Offering expert advice on software architecture, code optimization, and project planning. I help businesses leverage the right technologies to achieve their goals, ensuring a clear path from concept to deployment."
  }
];

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
