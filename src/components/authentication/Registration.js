import React, { useState, useContext } from 'react';
import './Registration.css';
import axios from '../../api/axios';


function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', {
        firstName,
        lastName,
        userId,
        email,
        password,
      });

    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
      console.error(error);
    }
  };

  return (
      <form className="reg-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Username" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
  );
}

export default Registration;