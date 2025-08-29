import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="profile-img">👨‍💻</div>
          <div className="about-text">
            <h3>Computer Science Student & Software Engineer</h3>
            <p>
              I'm a Computer Science student at the University of Virginia with a 3.93 GPA, 
              minoring in Data Science with a focal path in Cybersecurity. I have hands-on 
              experience as a Software Engineering Intern at ST Engineering iDirect and 
              Software Engineer at SwiftScore.
            </p>
            <p>
              I'm passionate about building scalable web applications, working with modern 
              technologies like React, TypeScript, Python, and cloud platforms. I've contributed 
              to production systems supporting satellite ground infrastructure and developed 
              full-stack applications from concept to deployment.
            </p>
            <p>
              When I'm not coding, you can find me diving with Scuba @ UVA, playing intramural 
              sports, or volunteering at the Virginia Discovery Museum. I'm also bilingual in 
              Spanish and hold AWS certifications.
            </p>
            <a 
              href="./thomas_welch_resume_job_8_7_25.pdf" 
              className="btn btn-primary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
