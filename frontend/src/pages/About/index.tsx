
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h1" className="text-center">About FetchAI</Card.Title>
              <Card.Text>
                FetchAI is a personalized AI-powered information aggregator for students at Carnegie Mellon University (CMU).
              </Card.Text>
              <Card.Text>
                Critical information for students is scattered across disparate sources like club Slacks, CMU webpages, career sites, and mailing lists. This makes it difficult to discover opportunities, join communities, and find relevant events.
              </Card.Text>
              <Card.Text>
                FetchAI acts as a personal AI agent that monitors all these sources. It scrapes, filters , and curates this information into a single, personalized, and centralized dashboard. The content is tailored to each user's specific, declared interests.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
