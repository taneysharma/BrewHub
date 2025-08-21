import React, { useState } from 'react';
import './Menu.css';


const menuItems = {
  coffee: [
    { title: 'Americano', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Cappuccino', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Macchiato', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Mocha', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Latte', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Espresso', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Black Coffee', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Instant Coffee', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
  ],
  hotDrinks: [
    { title: 'Hot Chocolate', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'White Chocolate', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Green Tea', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Black Tea', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Earl Grey', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Apple Cinnamon', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Lemon', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Vanila Tea', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
  ],
  desserts: [
    { title: 'Cupcake', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Chocolate Cake', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Doughnut', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
    { title: 'Croissant', price: '$20', description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit.' },
  ],
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('coffee'); // Default active category is 'coffee'

  return (
    <div className="menu">
      <h2 className="menu-title">Our Menu</h2>
      <div className="menu-categories">
        <button
          className={activeCategory === 'coffee' ? 'active' : ''}
          onClick={() => setActiveCategory('coffee')}
        >
          Coffee
        </button>
        <button
          className={activeCategory === 'hotDrinks' ? 'active' : ''}
          onClick={() => setActiveCategory('hotDrinks')}
        >
          Hot Drinks
        </button>
        <button
          className={activeCategory === 'desserts' ? 'active' : ''}
          onClick={() => setActiveCategory('desserts')}
        >
          Desserts
        </button>
      </div>

      <div className="menu-items">
        {menuItems[activeCategory].map((item, index) => (
          <div className="menu-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="price">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
