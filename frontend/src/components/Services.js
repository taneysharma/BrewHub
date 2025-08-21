import React from 'react';
import './Services.css';
import coffeeBeans from '../assets/coffee-beans.png';
import roasting from '../assets/roasting.png';
import highQuality from '../assets/high-quality.png';
import brewed from '../assets/brewed.png';
import variety from '../assets/variety.png';
import grinding from '../assets/grinding.png';

const servicesData = [
  {
    image: coffeeBeans,
    title: 'Selected Coffee Beans',
    description: 'Lorem Ipsum Dolor Sit, Amet Consectetur Adipisicing Elit. Nam Possimus Modi.',
  },
  {
    image: roasting,
    title: 'Own Roasting',
    description: 'Lorem Ipsum Dolor Sit, Amet Consectetur Adipisicing Elit. Nam Possimus Modi.',
  },
  {
    image: highQuality,
    title: 'High Quality',
    description: 'Lorem Ipsum Dolor Sit, Amet Consectetur Adipisicing Elit. Nam Possimus Modi.',
  },
  {
    image: brewed,
    title: 'Freshly Brewed',
    description: 'Lorem Ipsum Dolor Sit, Amet Consectetur Adipisicing Elit. Nam Possimus Modi.',
  },
  {
    image: variety,
    title: 'Coffee Variety',
    description: 'Lorem Ipsum Dolor Sit, Amet Consectetur Adipisicing Elit. Nam Possimus Modi.',
  },
  {
    image: grinding,
    title: 'Excellent Grinding',
    description: 'Lorem Ipsum Dolor Sit, Amet Consectetur Adipisicing Elit. Nam Possimus Modi.',
  },
];

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-container">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} className="service-image" />
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
