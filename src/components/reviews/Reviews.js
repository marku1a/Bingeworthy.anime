import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import './Review.css';

const Reviews = ({ getAnimeData, anime }) => {
    const reviewText = useRef();
    const { animeId } = useParams();
    const { auth } = useAuth();
    const { userId } = auth;
    const axiosPrivate = useAxiosPrivate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            await getAnimeData(animeId);
            setLoading(false); 
        };

        fetchData();
    }, [animeId]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosPrivate.get(`/anime-reviews/${animeId}`);
                setReviews(response.data || []);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        fetchReviews();
    }, [animeId]);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = reviewText.current;

      
        try {
            setError(null);
            setSuccess(null);
            const response = await axiosPrivate.post("/anime-reviews", {
                reviewBody: rev.value,
                imdbId: animeId,
                userId
            });

            const newReview = {
                userId: userId,
                body: rev.value
            };

            setReviews(prevReviews => [...prevReviews, newReview]);
            setSuccess(response.data);
            rev.value = '';
        } catch (error) {
            if (error?.response?.data) {
             setError(error.response.data);
            } else {
                setError("An error occurred while submitting the review.");
            }
        }
    };

    return (
        <Container className="review-container">
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col className="poster-col">
                    <div className="poster-container">
                    {loading ? (
                            <div className="loading-placeholder"></div>
                        ) : (
                            <img
                                src={anime?.poster}
                                alt=""
                                className={`poster-img ${imageLoaded ? 'loaded' : ''}`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        )}
                    </div>
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} reviewText={reviewText} labelText="Write a Review!"/>
                                {error && <p className="error-message">{error}</p>}
                                {success && <p className="success-message">{success}</p>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    <div className="reviews-wrapper">
                        {reviews.map((r, index) => (
                            <div key={index} className="reviews">
                                <Row>
                                    <Col><b>{r.userId}:</b> {r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;
