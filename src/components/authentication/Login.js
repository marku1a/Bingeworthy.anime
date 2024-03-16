import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser, setAccessToken, setRefreshToken, setIsAuthenticated } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        email,
        password,
      });
      const { access_token, refresh_token, userId } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setCurrentUser(userId);
      setIsAuthenticated(true);
      navigate('/');


      document.cookie = `access_token=${access_token}; HttpOnly; Secure; SameSite=Strict`;
      document.cookie = `refresh_token=${refresh_token}; HttpOnly; Secure; SameSite=Strict`;

  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
