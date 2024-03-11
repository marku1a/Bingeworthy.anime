import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import Registration from './components/authentication/Registration';
import Login from './components/authentication/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
    setRefreshToken('');
    setIsLoggedIn(false);
    navigate('/');
  };

  const [anime, setAnime] = useState();
  const [reviews, setReviews] = useState();

  const getAnime = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/anime");
      setAnime(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAnimeData = async (animeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/anime/${animeId}`);
      const singleAnime = response.data;
      setAnime(singleAnime);
      setReviews(singleAnime.reviews);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home anime={anime} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/Reviews/:animeId" element={<Reviews getAnimeData={getAnimeData} anime={anime} reviews={reviews} setReviews={setReviews} />}></Route>
          <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} />}></Route>
          <Route path="/Registration" element={<Registration />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;