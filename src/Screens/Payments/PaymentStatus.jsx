import React from 'react';
import { useLocation } from 'react-router-dom';

import '../../App.css';

export default function PaymentStatus() {
  const location = useLocation();
  const bool = location?.bool || "";
  console.log(bool)

  return (
    <div className="payment-status-container">
      <h1>{bool ? 'Payment Successful!' : 'Payment Failed'}</h1>
      <button className={bool ? 'success-btn' : 'failure-btn'} onClick={() => window.location.href = '/payment'}>
        Back to Home
      </button>
    </div>
  );
}
