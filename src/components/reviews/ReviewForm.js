import {Form,Button} from 'react-bootstrap';
import { useState } from 'react';

const ReviewForm = ({handleSubmit,reviewText,labelText,defaultValue}) => {
  const [charCount, setCharCount] = useState(defaultValue ? defaultValue.length : 0);
  const maxChars = 1500;

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setCharCount(text.length);
    }
  };

  return (

    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control 
              ref={reviewText} 
              as="textarea" 
              rows={3} 
              defaultValue={defaultValue}
              onChange={handleTextChange}
              maxLength={maxChars} 
            />
            <Form.Text className="char-counter">
              {charCount}/{maxChars} characters
            </Form.Text>
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
    </Form>   

  )
}

export default ReviewForm