import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: 15 },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: 12 },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", cost: 18 },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/fern-5114414_1280.jpg", cost: 14 },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", cost: 20 },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283036_1280.jpg", cost: 10 }
      ]
    },
    {
        category: "Aromatic",
        plants: [
          { name: "Lavender", image: "https://images.unsplash.com/photo-1506173186414-ac030e38600d?q=80&w=2070", cost: 15 },
          { name: "Rosemary", image: "https://images.unsplash.com/photo-1515589172344-742ed474a539?q=80&w=2070", cost: 12 },
          { name: "Mint", image: "https://images.unsplash.com/photo-1601493700631-2b16ec4bc891?q=80&w=2070", cost: 8 },
          { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1595123550441-915456722830?q=80&w=2070", cost: 10 },
          { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=2070", cost: 22 },
          { name: "Thyme", image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=2070", cost: 9 }
        ]
      }
      // Add a 3rd category here to meet the "at least 3 categories" requirement
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <a href="#" onClick={() => setShowCart(false)}>Plants</a>
        </div>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          <i className="fa fa-shopping-cart"></i>
          <span>{totalItems}</span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((cat, index) => (
            <div key={index}>
              <h2 className="category-title">{cat.category}</h2>
              <div className="plants-list">
                {cat.plants.map((plant, pIndex) => (
                  <div className="product-card" key={pIndex}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button 
                      disabled={cart.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}>
                      {cart.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
