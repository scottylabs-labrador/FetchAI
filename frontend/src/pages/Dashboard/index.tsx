
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const feedItems = [
    { date: '10/21/2025', source: 'Slack', link: '#', title: 'Robotics Club Meeting' },
    { date: '10/22/2025', source: 'Career Site', link: '#', title: 'Internship Opportunity at Google' },
    { date: '10/23/2025', source: 'Major News Board', link: '#', title: 'Midterm Exam Schedule' },
  ];

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Dashboard View</h1>
            <Link to="/bulletin">
              <Button variant="secondary">Change View</Button>
            </Link>
          </div>
          <Card>
            <Card.Header>Important Feed</Card.Header>
            <ListGroup variant="flush">
              {feedItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{item.date}</strong> - <span>{item.source}</span>
                    </div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">View Original</a>
                  </div>
                  <div>{item.title}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
