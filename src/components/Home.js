import React from 'react';
import { motion } from 'framer-motion';
import Services from './Services';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Work from './Work';
// import './Hero.css';

const Home = () => (
  <>
  <Hero />
  <Services />
  <Skills />
  <Projects />
  <Work />
  </>
);

export default Home;
