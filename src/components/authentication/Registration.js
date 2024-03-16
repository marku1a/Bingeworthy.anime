import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';


function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken, setRefreshToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        firstName,
        lastName,
        userId,
        email,
        password,
      });
      const { accessToken, refreshToken} = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
     
      // Set cookies with HttpOnly, Secure flags 
      document.cookie = `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`;
      document.cookie = `refresh_token=${refreshToken}; HttpOnly; Secure; SameSite=Strict`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="text" placeholder="Username" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;