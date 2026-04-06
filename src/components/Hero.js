import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpeg";

const Hero = () => (
  <section className="hero">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="card-container"
    >
      <img src={heroImage} alt="Preeti" className="hero-image" />
      <div>
        <h1>Preeti Dudi</h1>
        <h2>AI/ML Engineer & Robotics Systems Builder</h2>

        <p>
          Building intelligent systems with AI, voice interfaces, and real-world
          applications.
        </p>

        <p>
          I design and develop <strong>AI-powered systems</strong> combining
          machine learning, local LLMs, and robotics. With{" "}
          <strong>4+ years of software engineering experience</strong>, I focus
          on building 
          <strong> scalable, real-world solutions</strong> — from voice-enabled
          assistants to autonomous systems.
        </p>
      </div>
    </motion.div>
  </section>
);

export default Hero;
