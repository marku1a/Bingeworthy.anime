import {useEffect, useRef} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import './Review.css';

import React from 'react'

const Reviews = ({getAnimeData,anime,reviews,setReviews, onNavigateBack}) => {

    const reviewText = useRef();
    let params = useParams();
    const animeId = params.animeId;

    useEffect(()=>{
        getAnimeData(animeId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = reviewText.current;
        const userId = localStorage.getItem('userId');
        try
        {
            const response = await axios.post("http://localhost:8080/api/v1/anime-reviews",{reviewBody:rev.value,imdbId:animeId, userId});

            const updatedReviews = reviews?.map((r) => ({
                ...r,
                username: response.data.userId, 
              }));
        
              rev.value = '';
              setReviews(updatedReviews);
            } catch (err) {
              console.error(err);
            }
          };

        

  return (
    <Container className="review-container">
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col className="poster-col">
                <img src={anime?.poster} alt="" className="poster-img"/>
            </Col>
            <Col>
                {
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
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col><b>{r.username}:</b> {r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
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