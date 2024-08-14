import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import axios from '../../api/axios';


function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[!@#$%^&*()_+{}:"<>?[\];',./`~\\|-]).{6,}$/;
    if (userId.length < 4) {
      setError('Username must be at least 4 characters long.');
      return false;
    }
    if (!pattern.test(password)){
      setError('Password must contain at least one uppercase letter, one lowercase letter and one number or special character.');
      return false;
    }
    if(password !== confirmPassword) {
      setError('Passwords mismatch!');
      return false;
    }
    setError(null);
    return true;
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()){
      try {
        const response = await axios.post('/auth/register', {
          firstName,
          lastName,
          userId,
          email,
          password,
        });
        setSuccess('Registration successful! You can now login!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setUserId('');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          navigate('/Login');
        }, 2000);

      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } 
        //console.error(error);
        setSuccess(null);
      }
    }
  };

  return (
      <form className="reg-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Username" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

      </form>
  );
}

export default Registration;