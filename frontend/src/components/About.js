import React from 'react';
import "./About.css" ;
import coffeeImage from '../assets/about-coffee.png';

const About = () => {
  return (
    
    <section id="about" className="about-section">
        <h2 className="about-title">About Us</h2>
      <div className="about-content">
        <div className="about-image">
          <img src={coffeeImage} alt="Coffee" />
        </div>
        <div className="about-text">
          
          <h1>Coffee The Way It Was Meant To Be.</h1>
          <p><strong>Lorem Ipsum, Dolor Sit Amet Consectetur Adipisicing Elit. Eum Voluptatibus Dolores Aspernatur Animi Perferendis Iste!</strong></p>
          <p>Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Eum Voluptatibus Dolores Aspernatur Animi Perferendis Iste! Culpa Aut Enim Debitis Optio Illum Ipsum Quis Perferendis Dolor Expedita. Similique Necessitatibus Inventore Doloremque.</p>
          <button className="contact-button">Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default About;
