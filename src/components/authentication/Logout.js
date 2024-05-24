import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import axios from '../../api/axios';

const Logout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout', {}, {
        withCredentials: true, 
        headers: {
          Authorization: `Bearer ${auth.access_token}`
        }
      });
      setAuth({});
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
 
  return <Button onClick={handleLogout} variant="outline-danger" className="me-2">Logout</Button>;
}

export default Logout;