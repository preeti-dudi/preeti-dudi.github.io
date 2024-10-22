import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png'; // Add your profile or hero image in the assets folder
// import './Hero.css';

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
        <h2>Hello, world! 🌍</h2>
        <p>

          I'm Preeti, a full-stack software engineer with a passion for turning complex problems into simple, elegant solutions. Whether I'm coding up sleek apps in React Native or diving deep into the backend with Laravel and Node.js, I’m always on the lookout for my next big challenge.
        </p>
        <p>
          When I'm not coding, you’ll probably find me exploring the latest manga, indulging in epic fantasy novels, or dreaming about my next travel adventure. I believe that just like in coding, every journey—whether through a story or a new place—is a chance to learn something new. 💡


        </p>
        <p>
          Let's connect and build something awesome together! 🚀

        </p>
      </div>
    </motion.div>
  </section>
);

export default Hero;
