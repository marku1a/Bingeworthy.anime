import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import './AnimeCreate.css';

const AnimeCreate = ({ getAnimes }) => {

  const {auth} = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    title: '',
    imdbId: '',
    releaseDate: '',
    trailer: '',
    poster: '',
    genres: '',
    backdrops: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, imdbId, releaseDate, trailer, poster, genres, backdrops } = formData;
      await axiosPrivate.post('/anime/create-anime', {
        title,
        imdbId,
        releaseDate,
        trailer,
        poster,
        genres: genres.split(','),
        backdrops: backdrops.split(',')
    });
      getAnimes();
      navigate('/anime-list');
    } catch (err) {
      console.error('Failed to create anime', err);
    }
  };

  return (
    <div className="anime-create-container">
      <h2>Create New Anime</h2>
      <Form className="create-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formImdbId">
          <Form.Label>IMDB ID</Form.Label>
          <Form.Control
            type="text"
            name="imdbId"
            value={formData.imdbId}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formReleaseDate">
          <Form.Label>Release Date</Form.Label>
          <Form.Control
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTrailer">
          <Form.Label>Trailer</Form.Label>
          <Form.Control
            type="text"
            name="trailer"
            value={formData.trailer}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPoster">
          <Form.Label>Poster</Form.Label>
          <Form.Control
            type="text"
            name="poster"
            placeholder="Image URL"
            value={formData.poster}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGenres">
          <Form.Label>Genres (comma separated)</Form.Label>
          <Form.Control
            type="text"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBackdrops">
          <Form.Label>Backdrops (comma separated)</Form.Label>
          <Form.Control
            type="text"
            name="backdrops"
            placeholder="Image URL"
            value={formData.backdrops}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Anime
        </Button>
      </Form>
    </div>
  );
};

export default AnimeCreate;
