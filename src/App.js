import './App.css';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import Registration from './components/authentication/Registration';
import Login from './components/authentication/Login';
import useAuth from './hooks/useAuth';
import RequireAuth from './components/authentication/RequireAuth';
import PersistLogin from './components/authentication/PersistLogin';
import axios from './api/axios';
import AnimeList from './components/anime/AnimeList';
import UserList from './components/users/UserList';
import AnimeCreate from './components/anime/AnimeCreate';
import AnimeUpdate from './components/anime/AnimeUpdate';


const ROLES = {
  'User': 'ROLE_USER',
  'Admin': 'ROLE_ADMIN', 
}

function App() {

  const { auth } = useAuth();
  const { isAuthenticated, userId } = auth;
  
  const [anime, setAnime] = useState();
  const [animes, setAnimes] = useState();

  const getAnimes = async () => {
    try {
      const response = await axios.get("/anime");
      setAnimes(response.data);
    } catch (err) {
      //console.error(err);
    }
  };

  const getAnimeData = async (animeId) => {
    try {
      const response = await axios.get(`/anime/${animeId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        }
      );
      const singleAnime = response.data;
      setAnime(singleAnime);

      
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    getAnimes();
  }, []);


  return (
      <div className="App">
        <Header isAuthenticated={isAuthenticated} userId={userId}/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Home animes={animes} />}></Route>
              <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
                  <Route path="/Reviews/:animeId" element={ 
                    <Reviews getAnimeData={getAnimeData} anime={anime}/>}/> 
                </Route>
                <Route path="/anime-list" element={<AnimeList animes={animes} getAnimes={getAnimes} />}></Route>
                <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                  <Route path="/anime/create" element={<AnimeCreate getAnimes={getAnimes} />}></Route>
                  <Route path="/anime/:id/edit" element={<AnimeUpdate getAnimes={getAnimes} />}></Route>  
                  <Route path="/user-list" element={<UserList/>}></Route>         
              </Route>
            </Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Registration" element={<Registration />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </div>
  )
}

export default App;