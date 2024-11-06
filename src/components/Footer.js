import React, { useState } from 'react';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import emailjs from 'emailjs-com';
import './Footer.css';

const Footer = () => {
  // Define the contact links
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
  ];

  // Form state
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.from_name || !formData.from_email || !formData.message) {
      setFormStatus('Please fill out all fields.');
      return;
    }

    // await emailjs.send(
    //   "service_x53hdzs",
    //   "template_l35qfws",
    //   formData,
    //   "R_X_nIM0UFsKoJUKP"
    // );
    setFormStatus('Email sent successfully!');
    setTimeout(() => setFormStatus(''),2000)
    setFormData({ from_name: '', from_email: '', message: '' });
  };

  return (
    <footer className="footer">
          <h1>Contact Preeti</h1>

      <div className='footer-content' >
        {/* Contact Links */}
        <div className="contact-links ">
          <p>
            Feel free to reach out for opportunities, or just to say hi!
          </p>
          <div className='footer-links' >
          {contact.map((contactItem, index) => (
            <a
              key={index}
              href={contactItem.link}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer">
              <span className="icon">{contactItem.icon}</span>
              <span className='link-text'>{contactItem.text}</span>
            </a>
          ))}

          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit} className=''>
            <div className='contact-form-subgroup'>
            <div className="form-group">
              <label htmlFor="from_name" >Your Name</label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                placeholder="Enter your name"
                value={formData.from_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group ">
              <label htmlFor="from_email">Your Email</label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                placeholder="Enter your email"
                value={formData.from_email}
                onChange={handleChange}
                required
              />
            </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="app-button">Send Message</button>
          </form>

          {formStatus && <p className='status-text'>{formStatus}</p>}
        </div>

      </div>

      <p>&copy; 2024 Preeti Dudi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
