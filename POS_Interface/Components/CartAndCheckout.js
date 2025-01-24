import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles/CartAndCheckout.css';

function CartAndCheckout({ cart, removeFromCart, clearCart }) {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
    setIsPaymentDone(false); // Reset payment state when reopening modal
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPaymentMethod(''); // Reset payment method when closing modal
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setIsPaymentDone(false); // Reset payment status when switching method
  };

  const handlePayment = () => {
    setIsPaymentDone(true);
  };

  const totalAmount = cart.reduce((total, service) => total + service.price, 0);
  const qrValue = `upi://pay?pa=merchant@upi&pn=ServicePOS&am=${totalAmount}&cu=INR`;

  return (
    <div className="cart-checkout-container">
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name} - ${item.price.toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item)}
                className="remove-btn"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p className="total">Total: ${totalAmount.toFixed(2)}</p>
        <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>

      <div className="customer-details">
        <h2>Customer Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customerDetails.name}
          onChange={handleInputChange}
          className="input-small"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerDetails.email}
          onChange={handleInputChange}
          className="input-small"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={customerDetails.phone}
          onChange={handleInputChange}
          className="input-small"
        />
      </div>

      <div className="payment-method">
        <h2>Payment Method</h2>
        <button onClick={openPaymentModal} className="proceed-btn">
          Choose Payment Method (${totalAmount.toFixed(2)})
        </button>
      </div>

      {isPaymentModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {!isPaymentDone && !paymentMethod && (
              <div>
                <h3>Select Payment Method</h3>
                <button onClick={() => handlePaymentMethodSelect('UPI')}>
                  UPI
                </button>
                <button onClick={() => handlePaymentMethodSelect('Card')}>
                  Card
                </button>
                <button onClick={() => handlePaymentMethodSelect('Cash')}>
                  Cash
                </button>
                <button onClick={closePaymentModal}>Cancel</button>
              </div>
            )}

            {!isPaymentDone && paymentMethod === 'UPI' && (
              <div>
                <h3>Scan QR Code</h3>
                <QRCodeCanvas value={qrValue} size={100} />
                <button onClick={handlePayment}>Confirm Payment</button>
              </div>
            )}

            {!isPaymentDone && paymentMethod === 'Card' && (
              <div>
                <h3>Enter Card Details</h3>
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="Expiry Date (MM/YY)" />
                <input type="text" placeholder="CVV" />
                <button onClick={handlePayment}>Confirm Payment</button>
              </div>
            )}

            {!isPaymentDone && paymentMethod === 'Cash' && (
              <div>
                <h3>Pay with Cash</h3>
                <button onClick={handlePayment}>Confirm Payment</button>
              </div>
            )}

            {isPaymentDone && (
              <div className="invoice">
                <h3>Invoice</h3>
                <p><strong>Name:</strong> {customerDetails.name}</p>
                <p><strong>Email:</strong> {customerDetails.email}</p>
                <p><strong>Phone:</strong> {customerDetails.phone}</p>
                <p><strong>Amount Paid:</strong> ${totalAmount.toFixed(2)}</p>
                <p><strong>Payment Method:</strong> {paymentMethod}</p>
                <p>Thank you for your purchase!</p>
                <button onClick={closePaymentModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartAndCheckout;
