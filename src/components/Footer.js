import React from 'react'; import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
// import './Contact.css';

const contact = [
  {
    icon: <BsGithub />,
    text: "Github",
    link: "https://github.com/preeti-dudi"
  },
  {
    icon: <BsLinkedin />,
    text: "LinkedIn",
    link: "https://linkedin.com/in/preeti-dudi"
  },
  {
    icon: <BsInstagram />,
    text: "Instagram",
    link: "https://instagram.com/dudi.01.preeti"
  },
  {
    icon: <GoMail />,
    text: "Gmail",
    link: "mailto:prity.dudi@gmail.com"
  },
]

const Footer = () => (
  <footer className="footer">
    <p>
      Feel free to reach out for opportunities, collaborations, or just to say hi!
    </p>

    {contact.map((skill, index) => (

      <a key={index} href={skill.link} className=' app-button' target="_blank" rel="noopener noreferrer">
        <span className='icon'>{skill.icon}</span>
      </a>
    ))}
    <p>&copy; 2024 Preeti Dudi. All rights reserved.</p>
  </footer>
);

export default Footer;
