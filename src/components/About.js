import React from "react";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaBookOpen,
  FaPlaneDeparture,
  FaHandshake,
} from "react-icons/fa";

const CanvaEmbed = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingTop: "56.25%",
        paddingBottom: 0,
        boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
        marginTop: "1.6em",
        marginBottom: "0.9em",
        overflow: "hidden",
        borderRadius: "8px",
        willChange: "transform",
      }}
    >
      <iframe
        loading="lazy"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          border: "none",
          padding: 0,
          margin: 0,
        }}
        src="https://www.canva.com/design/DAGYH1a5rXE/V39kX0ov94Bo0DXLjtwh6Q/watch?embed"
        allowFullScreen
        title="Canva Design Embed"
      ></iframe>
    </div>
  );
};

const About = () => (
  <section className="about">

    {/* <CanvaEmbed /> */}

    <h2>About Me</h2>

    <p>
      I am an <strong>AI/ML engineer</strong> with a strong foundation in
      software engineering and a growing focus on
      <strong>intelligent systems and robotics</strong>. My work bridges backend
      systems, machine learning, and real-world deployment, allowing me to build{" "}
      <strong>end-to-end AI solutions</strong> rather than isolated models.
    </p>

    <p>
      I have <strong>4+ years of experience</strong> in backend and full-stack
      development, and hands-on experience in machine learning, NLP, and
      reinforcement learning. I have built systems using
      <strong>local LLMs (LLaMA3)</strong> and{" "}
      <strong>voice technologies (Coqui TTS)</strong>, focusing on practical and
      deployable AI applications.
    </p>

    <p>
      I am particularly interested in{" "}
      <strong>robotics, autonomous systems, and AI agents</strong>, and
      currently pursuing my M.Tech in Automation & Robotics at DIAT.
    </p>

    <p>
      I also enjoy{" "}
      <i>
        teaching, writing structured notes, and exploring emerging technologies
      </i>
      , which helps me continuously improve my understanding and communication
      of complex concepts.
    </p>
  </section>
);

export default About;
