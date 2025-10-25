
import React from 'react';
import { Container, Row, Col, Card, Form, Button, Accordion, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BulletinPage: React.FC = () => {
  const items = [
    { source: 'Jab', title: 'Robotics Meeting 10/22/2025-Room 1111' },
    { source: 'slack', title: 'AI Safety Club Discussion' },
    { source: 'Career Site', title: 'Internship Fair Next Week' },
  ];

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={3}>
          <Card>
            <Card.Header>Filters</Card.Header>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Clubs</Accordion.Header>
                <Accordion.Body>
                  <Form.Check type="checkbox" label="Robotics" />
                  <Form.Check type="checkbox" label="AI Safety" />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Classes</Accordion.Header>
                <Accordion.Body>
                  <Form.Check type="checkbox" label="Computer Science" />
                  <Form.Check type="checkbox" label="Design" />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Bulletin View</h1>
            <Link to="/dashboard">
              <Button variant="secondary">Change View</Button>
            </Link>
          </div>
          <Form className="mb-3">
            <Form.Control type="text" placeholder="Search..." />
          </Form>
          <ListGroup>
            {items.map((item, index) => (
              <ListGroup.Item key={index}>
                <strong>{item.source}:</strong> {item.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default BulletinPage;
