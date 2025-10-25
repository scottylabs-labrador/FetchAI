
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const SubmitFeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert('Please enter your feedback before submitting.');
      return;
    }
    try {
      const { error } = await supabase.from('feedback').insert([{ content: feedback }]);
      if (error) {
        throw error;
      }
      alert('Thank you for your feedback!');
      setFeedback('');
    } catch (error: any) {
      alert(`Error submitting feedback: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="text-center">Submit Feedback</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={10}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback here..."
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmitFeedbackPage;
