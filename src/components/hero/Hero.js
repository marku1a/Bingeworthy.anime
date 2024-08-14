import React, { useState, useEffect } from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper, Dialog, DialogContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCirclePlay, faImages, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

const Hero = ({ animes }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [openGallery, setOpenGallery] = useState(false);
    const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const reviews = (animeId) => {
        navigate(`/Reviews/${animeId}`);
    };

    const handleNext = () => {
        if (animes && animes.length > 0) {
            const currentAnime = animes[currentAnimeIndex];
            if (currentAnime && currentAnime.backdrops) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % currentAnime.backdrops.length);
            }
        }
    };

    const handlePrevious = () => {
        if (animes && animes.length > 0) {
            const currentAnime = animes[currentAnimeIndex];
            if (currentAnime && currentAnime.backdrops) {
                setCurrentIndex((prevIndex) => (prevIndex === 0 ? currentAnime.backdrops.length - 1 : prevIndex - 1));
            }
        }
    };

    const handleGalleryOpen = (animeIndex) => {
        setCurrentAnimeIndex(animeIndex);
        setCurrentIndex(0);
        setOpenGallery(true);
    };

    const handleGalleryClose = () => {
        setOpenGallery(false);
    };

    return (
        <div className="anime-carousel-container">
            <Carousel navButtonsAlwaysVisible={!isMobile} interval={7000} navButtonsProps={{
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
                    animes?.map((anime, index) => {
                        const currentBackdrop = anime.backdrops && anime.backdrops.length > 0 ? anime.backdrops[currentIndex % anime.backdrops.length] : '';
                        return (
                            <Paper key={anime.imdbId} className="navButtonsProps">
                                <div className="anime-card-container">
                                    <div className="anime-card" style={{ "--img": `url(${currentBackdrop})` }}>
                                        <div className="anime-details">
                                            <div className="anime-poster">
                                                <img src={anime.poster} alt="" />
                                            </div>
                                            <div className="anime-title">
                                                {anime.title}
                                            </div>
                                            <div className="anime-button-container">
                                                {!isMobile && (
                                                    <>
                                                        <div className="previous-button-icon-container" onClick={handlePrevious}>
                                                            <FontAwesomeIcon className="previous-button-icon"
                                                                icon={faChevronLeft} />
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
                                                                icon={faChevronRight} />
                                                        </div>
                                                    </>
                                                )}
                                                {isMobile && (
                                                    <>
                                                        <div className="gallery-button-icon-container" onClick={() => handleGalleryOpen(index)}>
                                                            <FontAwesomeIcon className="gallery-button-icon"
                                                                icon={faImages} />
                                                        </div>
                                                        <Link to={`/Trailer/${anime.trailer.substring(anime.trailer.length - 11)}`}>
                                                            <div className="play-button-icon-container">
                                                                <FontAwesomeIcon className="play-button-icon"
                                                                    icon={faCirclePlay}
                                                                />
                                                            </div>
                                                        </Link>
                                                    </>
                                                )}
                                                <div className="anime-review-button-container">
                                                    <button className="review-button" onClick={() => reviews(anime.imdbId)}>Reviews</button>
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
            <Dialog fullScreen open={openGallery} onClose={handleGalleryClose}>
                <DialogContent className="gallery-dialog-content">
                    <div className="close-button-container" onClick={handleGalleryClose}>
                        <FontAwesomeIcon className="close-button-icon" icon={faTimes} />
                    </div>
                    <div className="gallery-carousel">
                        <div className="gallery-previous-button-container" onClick={handlePrevious}>
                            <FontAwesomeIcon className="gallery-previous-button-icon" icon={faChevronLeft} />
                        </div>
                        {animes && animes.length > 0 && animes[currentAnimeIndex] && animes[currentAnimeIndex].backdrops && (
                            <img src={animes[currentAnimeIndex].backdrops[currentIndex]} alt="Backdrops" className="gallery-image" />
                        )}
                        <div className="gallery-next-button-container" onClick={handleNext}>
                            <FontAwesomeIcon className="gallery-next-button-icon" icon={faChevronRight} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Hero;
