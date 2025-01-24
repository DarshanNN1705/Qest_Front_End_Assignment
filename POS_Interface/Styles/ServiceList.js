import React, { useState } from 'react';
import '../styles/ServiceList.css';

function ServiceList({ addToCart }) {
  const [services] = useState([
    { id: 1, name: 'Yoga Session', price: 30 },
    { id: 2, name: 'Counseling Session', price: 50 },
    { id: 3, name: 'Meditation Session', price: 20 },
    { id: 4, name: 'Personal Training', price: 40 },
    { id: 5, name: 'Nutrition Consultation', price: 60 },
    { id: 6, name: 'Group Fitness Class', price: 25 },
  ]);

  return (
    <div className="service-list">
      <h2>Available Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id} className="service-item">
            <span>
              {service.name} - ${service.price}
            </span>
            <button onClick={() => addToCart(service)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceList;
