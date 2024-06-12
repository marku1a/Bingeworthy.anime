import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form} from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './AnimeList.css';

const AnimeList = ({ animes, getAnimes }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [sortCriteria, setSortCriteria] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');


    const roles = auth?.role || [];
    const isAdmin = roles.includes('ADMIN');

    if (!animes) {
      return <div>Loading...</div>;
    }

  
    const handleDelete = async (id) => {
      try {
        await axiosPrivate.delete(`/anime/${id}`);
        getAnimes(); 
      } catch (err) {
        console.error('Failed to delete anime', err);
      }
    };

    const handleSortChange = (e) => {
      const value = e.target.value;
      setSortCriteria(value === 'default' ? '' : e.target.value);
    };
    const handleGenreChange = (e) => {
      const value = e.target.value;
      setSelectedGenre(value === 'default' ? '' : e.target.value);
    };

    const sortAnime = (animes) => {
      switch (sortCriteria) {
        case 'name-ascending':
          return [...animes].sort((a, b) => a.title.localeCompare(b.title));
        case 'name-descending':
          return [...animes].sort((a, b) => b.title.localeCompare(a.title));
        case 'oldest':
          return [...animes].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        case 'newest':
          return [...animes].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        default:
          return animes;
      }
    };
    
    const filterAnime = (animes) => {
      if (!selectedGenre) return animes;
      return animes.filter(anime => anime.genres.includes(selectedGenre));
    }
    
    const sortedAnime = sortAnime(animes);
    const filteredAnime = filterAnime(sortedAnime);

    return (
      <div className="anime-list-container">
        <div className="controls-container">
                <Form.Select value={sortCriteria} onChange={handleSortChange}>
                    <option value="" disabled hidden>Sort by</option>
                    <option value="default">Default</option>
                    <option value="name-ascending">Name (A-Z)</option>
                    <option value="name-descending">Name (Z-A)</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </Form.Select>
                <Form.Select value={selectedGenre} onChange={handleGenreChange}>
                    <option value="" disabled hidden>Filter by Genre</option>
                    <option value="default">All genres</option>
                    {Array.from(new Set(animes.flatMap(anime => anime.genres))).map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </Form.Select>
                {isAdmin && (
                    <Button
                      className="create-anime-button"
                      variant="outline-light"
                      onClick={() => navigate('/anime/create')}
                    >
                      Create New Anime
                    </Button>
                )}
          </div>
        <div className="anime-list">
          {filteredAnime.map((anime) => (
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
  