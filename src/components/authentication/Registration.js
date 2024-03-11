import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
                firstName,
                lastName,
                email,
                password,
            });
            if (response.status === 200) {
              //Handle success registration
            } else {
              setError('Registration failed. Please try again.');
            } 
        } catch (err) {
            console.error(err);
            setError('An error occured. Please try again later.');
        }
    };
    return (
        <div>
          <h2>Registration</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      )
    }
    
export default Registration;






