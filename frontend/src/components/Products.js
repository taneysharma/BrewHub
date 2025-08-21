import React, { useState } from 'react';
import './Products.css';
import cupcake from '../assets/cupcake.png';
import cappuccino from '../assets/cappuccino.png';
import doughnut from '../assets/doughnut.png';
import latte from '../assets/latte.png';
import chocolateCake from '../assets/chocolate-cake.png'; 
import hotChocolate from '../assets/hot-chocolate.png';
import croissant from '../assets/croissant.png';
import greenTea from '../assets/green-tea.png';

const productsData = [
  {
    image: cupcake,
    title: 'Cupcake',
    rating: 5,
    price: '$12.00',
    oldPrice: '$15.00',
    description: 'A delightful, freshly baked cupcake with a rich frosting.',
    nutritionalInfo: {
      servingSize: '1 cupcake',
      calories: 250,
      totalFat: '12g',
      cholesterol: '20mg',
      sodium: '200mg',
      totalCarbs: '35g',
      sugars: '20g',
      protein: '3g',
      caffeine: '0mg',
    },
    ingredients: 'Flour, sugar, butter, eggs, vanilla extract, milk',
    allergens: 'Contains gluten, dairy, eggs'
  },
  {
    image: cappuccino,
    title: 'Cappuccino',
    rating: 5,
    price: '$12.00',
    oldPrice: '$15.00',
    description: 'Dark, rich espresso topped with a thick milk foam layer.',
    nutritionalInfo: {
      servingSize: '16 fl oz',
      calories: 120,
      totalFat: '4g',
      cholesterol: '15mg',
      sodium: '100mg',
      totalCarbs: '12g',
      sugars: '10g',
      protein: '8g',
      caffeine: '150mg',
    },
    ingredients: 'Milk, brewed espresso',
    allergens: 'Contains dairy'
  },
  // ... other products
  {
    image: doughnut,
    title: 'Doughnut',
    rating: 4,
    price: '$8.00',
    oldPrice: '$10.00',
    description: 'A fluffy doughnut glazed to perfection.',
    nutritionalInfo: {
      servingSize: '1 doughnut',
      calories: 300,
      totalFat: '15g',
      cholesterol: '30mg',
      sodium: '220mg',
      totalCarbs: '40g',
      sugars: '20g',
      protein: '4g',
      caffeine: '0mg',
    },
    ingredients: 'Flour, sugar, butter, eggs, milk, yeast',
    allergens: 'Contains gluten, dairy, eggs'
  },
  {
    image: latte,
    title: 'Latte',
    rating: 4,
    price: '$10.00',
    oldPrice: '$13.00',
    description: 'A smooth and creamy latte made with rich espresso and steamed milk.',
    nutritionalInfo: {
      servingSize: '16 fl oz',
      calories: 190,
      totalFat: '7g',
      cholesterol: '20mg',
      sodium: '120mg',
      totalCarbs: '18g',
      sugars: '14g',
      protein: '10g',
      caffeine: '150mg',
    },
    ingredients: 'Milk, brewed espresso',
    allergens: 'Contains dairy'
  },
  {
    image: chocolateCake,
    title: 'Chocolate Cake',
    rating: 5,
    price: '$20.00',
    oldPrice: '$25.00',
    description: 'A rich and decadent chocolate cake, perfect for dessert lovers.',
    nutritionalInfo: {
      servingSize: '1 slice',
      calories: 450,
      totalFat: '25g',
      cholesterol: '50mg',
      sodium: '300mg',
      totalCarbs: '50g',
      sugars: '30g',
      protein: '6g',
      caffeine: '5mg',
    },
    ingredients: 'Flour, sugar, cocoa powder, butter, eggs, milk, baking powder',
    allergens: 'Contains gluten, dairy, eggs'
  },
  {
    image: hotChocolate,
    title: 'Hot Chocolate',
    rating: 5,
    price: '$8.00',
    oldPrice: '$10.00',
    description: 'A warm and creamy hot chocolate made with real cocoa.',
    nutritionalInfo: {
      servingSize: '16 fl oz',
      calories: 210,
      totalFat: '8g',
      cholesterol: '10mg',
      sodium: '150mg',
      totalCarbs: '28g',
      sugars: '24g',
      protein: '5g',
      caffeine: '10mg',
    },
    ingredients: 'Milk, cocoa powder, sugar, whipped cream',
    allergens: 'Contains dairy'
  },
  {
    image: croissant,
    title: 'Croissant',
    rating: 4,
    price: '$6.00',
    oldPrice: '$8.00',
    description: 'A flaky and buttery croissant, perfect with coffee.',
    nutritionalInfo: {
      servingSize: '1 croissant',
      calories: 300,
      totalFat: '17g',
      cholesterol: '45mg',
      sodium: '260mg',
      totalCarbs: '30g',
      sugars: '5g',
      protein: '5g',
      caffeine: '0mg',
    },
    ingredients: 'Flour, butter, sugar, eggs, yeast, salt',
    allergens: 'Contains gluten, dairy, eggs'
  },
  {
    image: greenTea,
    title: 'Green Tea',
    rating: 3,
    price: '$5.00',
    oldPrice: '$7.00',
    description: 'A refreshing cup of green tea with natural antioxidants.',
    nutritionalInfo: {
      servingSize: '16 fl oz',
      calories: 0,
      totalFat: '0g',
      cholesterol: '0mg',
      sodium: '10mg',
      totalCarbs: '0g',
      sugars: '0g',
      protein: '0g',
      caffeine: '30mg',
    },
    ingredients: 'Brewed green tea leaves',
    allergens: 'None'
  },
];


const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleView = (product) => {
    setSelectedProduct(product);
    document.body.classList.add('no-scroll');
    setTimeout(() => {
      document.querySelector('.product-view-overlay').classList.add('active');
      document.querySelector('.product-view').classList.add('active');
    }, 10);
  };

  const closeModal = () => {
    document.querySelector('.product-view-overlay').classList.remove('active');
    document.querySelector('.product-view').classList.remove('active');
    setTimeout(() => {
      setSelectedProduct(null);
      document.body.classList.remove('no-scroll');
    }, 500);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`Login to continue`);
  };

  return (
    <section id="products" className="products-section">
      <h2 className="products-title">Our Products</h2>
      <div className="products-container">
        {productsData.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="product-image-container">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-buttons">
                <button className="view-button" onClick={() => handleView(product)}>View</button>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
            <h3 className="product-title">{product.title}</h3>
            <div className="product-rating">{'★'.repeat(product.rating)}</div>
            <div className="product-price">
              <span className="current-price">{product.price}</span>
              <span className="old-price">{product.oldPrice}</span>
            </div>
          </div>
        ))}
      </div>

      {/* "See More" Button that links to a new page */}
      {/* <div className="see-more-container">
        <a href="/ProductPage" className="view-button">See More</a>
      </div> */}

      {/* Modal for viewing product details */}
      {selectedProduct && (
        <div className="product-view-overlay">
          <div className="product-view">
            <div className="modal-header">
              <h2 className="productTitle">{selectedProduct.title}</h2>
              <button className="view-close-button" onClick={closeModal}>X</button>
            </div>
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <p>{selectedProduct.description}</p>
            {/* Additional Product Info */}
            <div className="nutritional-info">
              <h3>Nutritional Information</h3>
              <p>Serving Size: {selectedProduct.nutritionalInfo.servingSize}</p>
              <p>Calories: {selectedProduct.nutritionalInfo.calories}</p>
              <p>Total Fat: {selectedProduct.nutritionalInfo.totalFat}</p>
              <p>Cholesterol: {selectedProduct.nutritionalInfo.cholesterol}</p>
              <p>Sodium: {selectedProduct.nutritionalInfo.sodium}</p>
              <p>Total Carbs: {selectedProduct.nutritionalInfo.totalCarbs}</p>
              <p>Sugars: {selectedProduct.nutritionalInfo.sugars}</p>
              <p>Protein: {selectedProduct.nutritionalInfo.protein}</p>
              <p>Caffeine: {selectedProduct.nutritionalInfo.caffeine}</p>
            </div>
            <div className="ingredients-allergens">
              <h3>Ingredients</h3>
              <p>{selectedProduct.ingredients}</p>
              <h3>Allergens</h3>
              <p>{selectedProduct.allergens}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
