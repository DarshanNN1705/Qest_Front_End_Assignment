// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ServiceList from './components/ServiceList';
import CartAndCheckout from './components/CartAndCheckout';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const addToCart = (service) => {
    setCart([...cart, service]);
  };

  const removeFromCart = (service) => {
    setCart(cart.filter((item) => item.id !== service.id)); // Fixed implementation
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCustomerDetails = (details) => {
    setCustomerDetails(details);
  };

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        {/* Section 1: Available Services */}
        <section className="service-section">
          <ServiceList addToCart={addToCart} />
        </section>

        {/* Section 2: Cart, Customer Details, Payment, Checkout */}
        <section className="cart-checkout-section">
          <CartAndCheckout 
            cart={cart} 
            removeFromCart={removeFromCart} 
            clearCart={clearCart} 
            customerDetails={customerDetails} 
            handleCustomerDetails={handleCustomerDetails} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;
