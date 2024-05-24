import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
          const response = await axios.post('/auth/refresh-token', null, {
            withCredentials: true
          });
 
        const {userId, role, access_token} = response.data;
        setAuth(prev => {
                if (prev.access_token === access_token) return prev; // Avoid unnecessary state update
                return { ...prev, userId, role, access_token, isAuthenticated: true };
            });
        return access_token;
        } catch (err) {
          console.error('Error refreshing token:', err);
          throw err;
        }
    };
    return refresh;
};
    
export default useRefreshToken;