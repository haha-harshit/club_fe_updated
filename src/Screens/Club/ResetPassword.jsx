// ResetPassword.jsx

import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // In a real-world scenario, you would send a request to your server to handle the password reset logic.
    // For simplicity, let's just log the email for now.
    console.log(`Password reset email sent to: ${email}`);
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
