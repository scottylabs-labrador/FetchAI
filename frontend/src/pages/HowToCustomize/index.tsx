
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HowToCustomizePage: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h1" className="text-center">How to Customize</Card.Title>
              <Card.Text>
                This page will guide users on how to use the "Interest Ranking" setting to improve their feed.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HowToCustomizePage;
