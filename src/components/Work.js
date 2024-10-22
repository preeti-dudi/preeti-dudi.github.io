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
    company: "Novo Invent Software",
    location: "Noida",
    duration: "May 2022 – August 2024",
    projects: [
      {
        name: "Mobile Account Management Application",
        tech_skills: [
          {
            icon: <TbBrandLaravel />,
            text: "Laravel"
          },
          {
            icon: <SiMysql />,
            text: "MySQL"
          },
          {
            icon: <MdApi />,
            text: "RESTful APIs"
          },
          {
            icon: <MdPayment />,
            text: "Payment Gateway Integration"
          },
          {
            icon: <BiCodeCurly />,
            text: "API Development"
          },
          {
            icon: <MdErrorOutline />,
            text: "Error Handling"
          },
          {
            icon: <MdOutlineStorage />,
            text: "Database Optimization"
          }
        ],
        details: [
          "Developed backend services using Laravel to support user account management, including authentication, profile updates, and secure data retrieval.",
          "Integrated third-party payment gateways, ensuring secure transactions and smooth user experiences.",
          "Designed and optimized database schemas, reducing data retrieval time and improving application performance.",
          "Implemented error-handling mechanisms and logging to enhance system stability and streamline debugging.",
          "Collaborated with frontend teams to ensure seamless integration between backend services and mobile application interfaces."
        ]
      },
      {
        name: "Online Retail Platform",
        tech_skills: [
          {
            icon: <TbBrandLaravel />,
            text: "Laravel"
          },
          {
            icon: <SiMysql />,
            text: "MySQL"
          },
          {
            icon: <BiCodeCurly />,
            text: "API Development"
          },
          {
            icon: <MdQueue />,
            text: "Automation with Queues"
          },
          {
            icon: <MdSchedule />,
            text: "Job Scheduling"
          },
          {
            icon: <SiPostgresql />,
            text: "Database Migrations"
          },
          {
            icon: <MdGroups />,
            text: "Cross-functional Collaboration"
          }
        ],
        details: [
          "Developed backend logic for managing product inventory, user authentication, order processing, and payment integration.",
          "Created automated workflows using scheduled jobs and queues, improving task management and reducing manual intervention.",
          "Built RESTful API endpoints to facilitate communication between the backend and frontend, ensuring a seamless user experience.",
          "Managed database operations, including data migrations, schema design, and optimizing SQL queries for better performance.",
          "Coordinated with cross-functional teams to address technical challenges and ensure timely delivery of project milestones."
        ]
      }
    ]
  },
  {
    title: "Internship Software Engineer",
    company: "Novo Invent Software",
    location: "Noida",
    duration: "Jan 2021 – May 2022",
    projects: [
      {
        name: "Educational Mobile Application",
        tech_skills: [
          {
            icon: <TbBrandReactNative />,
            text: "React Native"
          },
          {
            icon: <SiJavascript />,
            text: "JavaScript"
          },
          {
            icon: <MdApi />,
            text: "API Integration"
          },
          {
            icon: <MdOutlineOndemandVideo />,
            text: "Video Download and Playback"
          },
          {
            icon: <MdOutlineDesignServices />,
            text: "Responsive UI Design"
          },
          {
            icon: <MdOutlineVpnKey />,
            text: "User Authentication"
          }
        ],
        details: [
          "Developed user interfaces using React Native, focusing on delivering a visually appealing and intuitive experience for users.",
          "Implemented video playback functionality, including features like play, pause, seek, and download, ensuring smooth content delivery.",
          "Integrated APIs to fetch video content and manage download queues, providing a seamless offline experience for users.",
          "Collaborated with design teams to translate wireframes into responsive UI components.",
          "Conducted testing to ensure application stability and identified bugs, contributing to overall product quality."
        ]
      },
      {
        name: "Financial Services Platform",
        tech_skills: [
          {
            icon: <SiWordpress />,
            text: "WordPress"
          },
          {
            icon: <SiPhp />,
            text: "PHP"
          },
          {
            icon: <SiJavascript />,
            text: "JavaScript"
          },
          {
            icon: <MdApi />,
            text: "REST APIs"
          },
          {
            icon: <MdCheckCircleOutline />,
            text: "Quality Assurance"
          },
          {
            icon: <MdBugReport />,
            text: "Testing and Debugging"
          }
        ],
        details: [
          "Assisted in the development of a WordPress-based platform, focusing on testing and quality assurance for user-facing features.",
          "Implemented custom functionalities for the backend, including user authentication and data management.",
          "Conducted thorough testing of the platform’s functionalities, identifying and resolving critical issues to improve user experience.",
          "Documented key processes and research findings to facilitate knowledge transfer and support future development efforts.",
          "Collaborated with backend teams to integrate API endpoints and ensure consistency in data flow between the server and frontend."
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
