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

            rev.value = '';
        } catch (err) {
            console.error("Error adding review:", err);
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
                                <ReviewForm handleSubmit={addReview} reviewText={reviewText} labelText="Write a Review!" />
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
