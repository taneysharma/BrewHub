import React, { useState } from "react";
import "./gallery.css";

// Import images from the assets folder
import img1 from "../assets/1st.png";
import img2 from "../assets/2nd.png";
import img3 from "../assets/3rd.png";
import img4 from "../assets/4th.png";
import img5 from "../assets/5th.png";
import img6 from "../assets/6th.png";
import img7 from "../assets/7th.png";
import img8 from "../assets/8th.png";
import img9 from "../assets/9th.png";
import img10 from "../assets/10th.png";
import img11 from "../assets/11th.png";
import img12 from "../assets/12th.png";
import img13 from "../assets/13th.png";
import img14 from "../assets/14th.png";
import img15 from "../assets/15th.png";
import img16 from "../assets/16th.png";
import img17 from "../assets/17th.png";
import img18 from "../assets/18th.png";
import img19 from "../assets/19th.png";
import img20 from "../assets/20th.png";
import img21 from "../assets/21st.png";
import img22 from "../assets/22nd.png";
import img23 from "../assets/23rd.png";
import img24 from "../assets/24th.png";

const Gallery = () => {
  const items = [
    { id: 1, name: "Espresso", category: "Coffee", img: img1 },
    { id: 2, name: "Latte", category: "Coffee", img: img2 },
    { id: 3, name: "Cappuccino", category: "Coffee", img: img3 },
    { id: 4, name: "green tea", category: "Drinks", img: img4 },
    { id: 5, name: "Milkshake", category: "Drinks", img: img5 },
    { id: 6, name: "Hot Coco", category: "Drinks", img: img6 },
    { id: 7, name: "Crosont", category: "Desserts", img: img7 },
    { id: 8, name: "Cupcake", category: "Desserts", img: img8 },
    { id: 9, name: "Cream Donuts", category: "Desserts", img: img9 },
    { id: 10, name: "Strawberry Pastry", category: "Desserts", img: img10 },
    { id: 11, name: "Macaron", category: "Desserts", img: img11 },
    { id: 12, name: "Rasberry Cheesecake", category: "Desserts", img: img12 },
    { id: 13, name: "Mocha", category: "Coffee", img: img13 },
    { id: 14, name: "Hot Chocolate", category: "Drinks", img: img14 },
    { id: 15, name: "Smoothie", category: "Drinks", img: img15 },
    { id: 16, name: "Honey Coffee", category: "Coffee", img: img16 },
    { id: 17, name: "Cream Fruit Blast", category: "Desserts", img: img17 },
    { id: 18, name: "Blueberry Choco delight", category: "Desserts", img: img18 },
    { id: 19, name: "Boba shake", category: "Drinks", img: img19 },
    { id: 20, name: "Iced Matcha", category: "Drinks", img: img20 },
    { id: 21, name: "Iced Tea", category: "Drinks", img: img21 },
    { id: 22, name: "Milk Tea", category: "Coffee", img: img22 },
    { id: 23, name: "Dalgona Coffee", category: "Coffee", img: img23 },
    { id: 24, name: "Matcha Coffee", category: "Coffee", img: img24 },
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <div className="gallery-container">
      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Coffee", "Drinks", "Desserts"].map((filter) => (
          <button
            key={filter}
            className={`filter-button ${
              activeFilter === filter ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <img src={item.img} alt={item.name} className="gallery-image" />
            <div className="overlay">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
 