import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import './Work.css';
import { TbBrandLaravel, TbBrandReactNative } from "react-icons/tb";
import { SiMysql, SiPostgresql, SiWordpress, SiPhp, SiJavascript } from "react-icons/si";
import { BiCodeCurly } from "react-icons/bi";
import { MdPayment, MdErrorOutline, MdOutlineStorage, MdSchedule, MdGroups, MdOutlineOndemandVideo, MdOutlineDesignServices, MdBugReport, MdCheckCircleOutline, MdOutlineVpnKey, MdApi, MdQueue } from "react-icons/md";



const work_experience = [
  {
    title: "Software Engineer",
    company: "Novoinvent Software",
    location: "Noida",
    duration: "Jun 2022 – Aug 2024",
    projects: [
      {
        name: "Backend Systems & API Development",
        tech_skills: [
          { icon: <SiJavascript />, text: "JavaScript" },
          { icon: <SiPhp />, text: "PHP" },
          { icon: <MdApi />, text: "REST APIs" },
          { icon: <SiMysql />, text: "Databases" }
        ],
        details: [
          "Led backend development for scalable applications with focus on performance and reliability.",
          "Designed REST APIs and optimized database queries for efficient data handling.",
          "Implemented real-time data processing and automation workflows using queues and schedulers.",
          "Worked on video/data handling features and system integrations."
        ]
      }
    ]
  },
  {
    title: "Software Developer",
    company: "Kalkine Solutions Pvt Ltd",
    location: "India",
    duration: "Mar 2025 – Jul 2025",
    projects: [
      {
        name: "Backend Optimization & Data Systems",
        tech_skills: [
          { icon: <SiJavascript />, text: "JavaScript" },
          { icon: <MdApi />, text: "REST APIs" },
          { icon: <SiMysql />, text: "Database Optimization" }
        ],
        details: [
          "Developed and optimized backend systems for high-performance applications.",
          "Improved system efficiency through caching and database tuning.",
          "Designed structured data pipelines and logging systems.",
          "Collaborated on deployment and debugging of production systems."
        ]
      }
    ]
  }
]




const Work = () => {

  const [seeMoreIndex, setSeeMoreIndex] = useState(-1);

  return (
    <section className="work">
      <h2>Work Experience</h2>
      <div
        className="work-content"
      >
        {work_experience.map((work, exp_index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 * exp_index }}
            key={exp_index}  className='center-text'>
            <h3>{work.title} - {work.company}</h3>
            <p>{work.duration}</p>
            <div className='card-container'>{
              work.projects.map((project, pro_index) => (
                <div key={pro_index} className='card'>
                  <h4>{project.name}</h4>
                  {
                    seeMoreIndex === (exp_index + '|' + pro_index) ?
                    <>
                    <div className='list-card-container'>
                      {project.details.map((detail, det_index) => (
                        <div className='small-card card' key={det_index}>{det_index + 1}. {detail}</div>
                      ))}
                    </div>

                    <button className='app-button' onClick={(e) => {setSeeMoreIndex(-1) }} >
                      View Skills
                    </button>
                    </>
  
                    : 
                    <>
                    <div className='small-card-container'>
                      {project.tech_skills.map((skill, ski_index) => (
                        <motion.div className='small-card card' 
                        initial={{ y: -200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{  stiffness: 100, delay: 0.2 * ski_index + pro_index + exp_index}} key={ski_index}>
                          <div className='small-icon'> {skill.icon}</div> {
                          skill.text}</motion.div>
                      ))}
                    </div>
                    <button className='app-button' onClick={(e) => {setSeeMoreIndex((exp_index + '|' + pro_index)) }} >
                      View work done
                    </button>
                    </>
                  }

                </div>
              ))}
            </div>
          </motion.div>
        ))
        }
      </div>
    </section>
  );
}

export default Work;
