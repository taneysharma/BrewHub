// TeamMember.js
import React from 'react';
import './TeamMember.css';

const TeamMember = ({ name, title, image, socialLinks }) => {
  return (
    <div className="team-member">
      <img src={image} alt={name} className="team-member-image" />
      <h3>{name}</h3>
      <p className="team-member-title">{title}</p>
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            <i className={`fab fa-${link.platform}`}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
