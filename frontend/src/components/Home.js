import React, { useState, useEffect } from 'react';
import './Home.css';
import About from './About';
import Services from './Services';
import Products from './Products';
import gallery from './gallery';
import Menu from './Menu';
import Team from './Team';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

// Import the images
import image1 from '../assets/Home-1.png';
import image2 from '../assets/Home-2.png';
import image3 from '../assets/Home-3.png';

const slides = [
  {
    title: 'Live Your Best Coffee Life',
    subtitle: "We Don't Make Your Coffee. We Make Your Day.",
    image: image1, // Use the imported image here
    button1: 'View Menu',
    button2: 'Book Table',
  },
  {
    title: 'A Cup Of Coffee For Every Mood',
    subtitle: "We Don't Make Your Coffee. We Make Your Day.",
    image: image2, // Use the imported image here
    button1: 'View Menu',
    button2: 'Book Table',
  },
  {
    title: 'We Make Coffee More Enjoyable',
    subtitle: "We Don't Make Your Coffee. We Make Your Day.",
    image: image3, // Use the imported image here
    button1: 'View Menu',
    button2: 'Book Table',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Change slide every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
<>
    {/* Hero Section  */}
    <div 
      className="hero"
      style={{
        backgroundImage: `url(${slides[currentSlide].image})`, // Set dynamic background
      }}
    >
      <div className="hero-content">
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].subtitle}</p>
        <div className="hero-buttons">
          <button className="btn-view">{slides[currentSlide].button1}</button>
          <button className="btn-book">{slides[currentSlide].button2}</button>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </div>

      <About />
      <Services />
      <Products />
      <gallery />
      <Menu />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </>
    

  );
};

export default Home;
