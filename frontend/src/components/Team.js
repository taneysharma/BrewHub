// Team.js
import React from 'react';
import TeamMember from './TeamMember';
import './Team.css';

import Cristiano from '../assets/cristiano-harris.png';
import Amy from '../assets/amy-jones.png';
import Paul from '../assets/paul-roger.png';
import Scarlet from '../assets/scarlet-david.png';

const teamMembers = [
  {
    name: 'Cristiano Harris',
    title: 'CEO',
    image: Cristiano,
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
  },
  {
    name: 'Amy Jones',
    title: 'Founder',
    image: Amy,
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
  },
  {
    name: 'Paul Roger',
    title: 'Manager',
    image: Paul,
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
  },
  {
    name: 'Scarlet David',
    title: 'Manager',
    image: Scarlet,
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
  },
];

const Team = () => {
  return (
    <section className="team-section">
      <h2>Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export default Team;
