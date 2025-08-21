import React, { useState } from 'react';
import './Testimonials.css';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import jasonRoy from '../assets/jason-roy.png';
import evelynJones from '../assets/evelyn-jones.png';
import virajPatel from '../assets/viraj-patel.png';
import emmaWatson from '../assets/emma-watson.png';

const testimonials = [
  {
    name: 'Jason Roy',
    title: 'CEO',
    image: jasonRoy,
    rating: 5,
    text: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Voluptatum Deleniti Architecto Harum Natus Aliquid Nostrum Ad Asperiores Sequi, Eligendi Sint Assumenda Eum Illo Similique Repellendus.',
  },
  {
    name: 'Evelyn Jones',
    title: 'Manager',
    image: evelynJones,
    rating: 5,
    text: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Voluptatum Deleniti Architecto Harum Natus Aliquid Nostrum Ad Asperiores Sequi, Eligendi Sint Assumenda Eum Illo Similique Repellendus.',
  },
  {
    name: 'Viraj Patel',
    title: 'Client',
    image: virajPatel,
    rating: 5,
    text: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Voluptatum Deleniti Architecto Harum Natus Aliquid Nostrum Ad Asperiores Sequi, Eligendi Sint Assumenda Eum Illo Similique Repellendus.',
  },
  {
    name: 'Emma Watson',
    title: 'Client',
    image: emmaWatson,
    rating: 5,
    text: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Voluptatum Deleniti Architecto Harum Natus Aliquid Nostrum Ad Asperiores Sequi, Eligendi Sint Assumenda Eum Illo Similique Repellendus.',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <h2>Testimonials</h2>
      <div className="testimonial-card">
        <button className="nav-button" onClick={handlePrev}>
          <FaChevronLeft />
        </button>
        <div className="testimonial-content">
          <img src={testimonials[current].image} alt={testimonials[current].name} className="testimonial-image" />
          <h3 className="testimonial-name">{testimonials[current].name}</h3>
          <p className="testimonial-title">{testimonials[current].title}</p>
          <div className="stars">
            {Array(testimonials[current].rating)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="star" />
              ))}
          </div>
          <FaQuoteLeft className="quote-icon left" />
          <p className="testimonial-text">{testimonials[current].text}</p>
          <FaQuoteRight className="quote-icon right" />
        </div>
        <button className="nav-button" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>
      <div className="indicator-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
