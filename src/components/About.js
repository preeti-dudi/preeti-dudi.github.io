import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaBookOpen, FaPlaneDeparture, FaHandshake } from "react-icons/fa";

const about_me = [
  {
    icon: <FaLaptopCode />,
    text: "Hey there! I'm Preeti, a software engineer who’s always on the hunt for the next coding challenge or the perfect playlist to code along to. With 3 years of experience in full-stack development, I specialize in crafting scalable and high-quality solutions using React Native, Laravel, and Node.js."
  },
  {
    icon: <FaBookOpen />,
    text: "When I’m not busy turning complex problems into elegant solutions, you can find me immersed in the world of manga, manhwa, or a good fantasy novel—usually while grooving to my favorite songs. Think of me as your friendly neighborhood tech geek with a taste for epic stories and catchy beats."
  },
  {
    icon: <FaPlaneDeparture />,
    text: "But it's not all about screens and scripts! I also have a serious case of wanderlust. Whether it's exploring the bustling streets of Delhi or venturing off to hidden gems, traveling is my way of hitting the refresh button. Just like in coding, every adventure is a new learning experience (though debugging a road trip is a bit different from debugging JavaScript!)."
  },
  {
    icon: <FaHandshake />,
    text: "If you're looking for someone who can bring both creativity and technical expertise to your next project—or just want to chat about the latest manhwa or travel tales—feel free to reach out. Let's build something amazing together!"
  }
];


const About = () => (
  <section className="about">
    <h2>About Me</h2>
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, delayChildren: 1 }}
      className="about-content"
    >
      {about_me.map((para, index) => (
        <div
          key={index}
          className="card-container "
        >
          {
            index % 2 === 0 ?
              <></> :
              <div className='extra-big-icon hidden-on-small card center-text'>{para.icon}</div>
          }
          <p className='card'><span className='big-icon hidden-on-big center-text'>{para.icon}<br/></span>{para.text}</p>
          {
            index % 2 === 0 ?
              <div className='extra-big-icon hidden-on-small card center-text'>{para.icon}</div> :
              <></>
          }
        </div>
      ))}

    </motion.div>
  </section>
);

export default About;
