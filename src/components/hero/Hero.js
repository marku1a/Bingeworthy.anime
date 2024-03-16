import React, { useState } from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Hero = ({animes}) => {

    const navigate = useNavigate();
    function reviews(animeId) {
        navigate(`/Reviews/${animeId}`);
    }
    
    const [autoPlay, setAutoPlay] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    
    const handleNext = () => {
        setAutoPlay(false);
        const currentAnime = animes[currentIndex % animes.length];
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentAnime.backdrops.length);
        setTimeout(() => {
            setAutoPlay(true);
        }, 4000); 
    };

    const handlePrevious = () => {
        setAutoPlay(false);
        const currentAnime = animes[currentIndex % animes.length];
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? currentAnime.backdrops.length - 1 : prevIndex - 1));
        setTimeout(() => {
            setAutoPlay(true);
        }, 4000); 
    };
    
    return (
        <div className="anime-carousel-container">
            <Carousel navButtonsAlwaysVisible={true} navButtonsProps={{
        style: {
          width: '40px', 
          height: '200px', 
          marginTop: '-50px',
          backgroundColor: 'rgba(255, 255, 255, 0.07)',
          borderRadius: 0,
          scale: '10px',
        },
      }}>
   
                {
                    animes?.map((anime) =>{
                        return(
                            <Paper key={anime.imdbId} className="navButtonsProps">
                                <div className="anime-card-container">
                                    <div className="anime-card" style={{"--img": `url(${anime.backdrops[currentIndex % anime.backdrops.length]})`}}>
                                        <div className="anime-details">
                                            <div className="anime-poster">
                                                <img src={anime.poster} alt=""/>
                                            </div>
                                            <div className="anime-title">
                                                {anime.title}
                                            </div>
                                            <div className="anime-button-container">
                                                <div className="previous-button-icon-container" onClick={handlePrevious}>
                                                    <FontAwesomeIcon className="previous-button-icon"
                                                    icon={faChevronLeft}/>
                                                </div>
                                                <Link to={`/Trailer/${anime.trailer.substring(anime.trailer.length - 11)}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className="play-button-icon"
                                                    icon={faCirclePlay}
                                                    />
                                                </div>
                                                </Link>
                                                <div className="next-button-icon-container" onClick={handleNext}>
                                                    <FontAwesomeIcon className="next-button-icon"
                                                    icon={faChevronRight}/>
                                                </div>
                                                <div className="movie-review-button-container">
                                                    <Button variant="info" onClick={() => reviews(anime.imdbId)}>Reviews</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
            </div>
    )
}
export default Hero