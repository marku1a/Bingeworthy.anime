import React, { useState, useEffect  } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import axios from '../../api/axios';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/authenticate', {
        email,
        password,
      }, {
        withCredentials: true
      });
      console.log('Response:', response);
      const { access_token, userId, role } = response.data;
      setAuth({ email, userId, role, access_token, isAuthenticated: true });
      setEmail('');
      setPassword('');
      navigate('/');

    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
      console.error(error);
      }
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
}, [persist])

  return (
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <div className="persistCheck">
          <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
          <label htmlFor="persist">Trust This Device</label>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
  );
}

export default Login;
