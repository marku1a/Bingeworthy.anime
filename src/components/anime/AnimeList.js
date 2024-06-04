import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './AnimeList.css';

const AnimeList = ({ animes, getAnimes }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const roles = auth?.role || [];
    const isAdmin = roles.includes('ADMIN');

    if (!animes) {
      return <div>Loading...</div>;
    }
  
    const handleDelete = async (id) => {
      try {
        await axiosPrivate.delete(`/anime/${id}`);
        getAnimes(); // Refresh the list after deletion
      } catch (err) {
        console.error('Failed to delete anime', err);
      }
    };
  
    return (
      <div className="anime-list-container">
        {isAdmin && (
          <div className="create-anime-button-container">
            <Button
              className="create-anime-button"
              onClick={() => navigate('/anime/create')}
            >
              Create New Anime
            </Button>
          </div>
        )}
        <div className="anime-list">
          {animes.map((anime) => (
            <div key={anime.imdbId} className="anime-list-card">
              <div className="anime-list-poster">
                <img src={anime.poster} alt={`${anime.title} Poster`} />
                <div className="anime-list-actions">
                  <Button
                    variant="info"
                    onClick={() => navigate(`/Reviews/${anime.imdbId}`)}
                  >
                    Reviews
                  </Button>
                  {isAdmin && (
                    <>
                      <Button
                        variant="warning"
                        onClick={() => navigate(`/anime/${anime.imdbId}/edit`)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(anime.imdbId)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="anime-list-title">{anime.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AnimeList;
  