import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import './Review.css';

const Reviews = ({getAnimeData, anime}) => {
    const reviewText = useRef();
    const { animeId } = useParams();
    const { auth } = useAuth();
    const { isAuthenticated, access_token, userId } = auth;
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        getAnimeData(animeId);
    },[])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/anime-reviews/${animeId}`,{
                    headers: {
                        Authorization: `Bearer ${auth.access_token}`
                    }
                });
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
        
        if(isAuthenticated) {
            try {
                const response = await axios.post("/anime-reviews", {
                    reviewBody: rev.value,
                    imdbId: animeId,
                    userId
                }, {
                    headers: {
                        Authorization: `Bearer ${auth.access_token}`
                    }
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
        } else {
            // Handle authentication error
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
                        <img src={anime?.poster} alt="" className="poster-img"/>
                    </div>
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} reviewText={reviewText} labelText = "Write a Review!" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        reviews.map((r, index) => (
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
                        ))
                    }
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

export default Reviews


    