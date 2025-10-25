
import React from 'react';
import { Container, Row, Col, Card, Nav, Tab, Button } from 'react-bootstrap';

const SettingsPage: React.FC = () => {
  return (
    <Container fluid className="mt-5">
      <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notifications">Notifications</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="interest-ranking">Interest Ranking</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="default-view">Default View</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Card>
                  <Card.Body>
                    <Card.Title>Profile</Card.Title>
                    <Card.Text>Basic user info</Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="notifications">
                <Card>
                  <Card.Body>
                    <Card.Title>Notifications</Card.Title>
                    <Card.Text>Control email/push alerts</Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="interest-ranking">
                <Card>
                  <Card.Body>
                    <Card.Title>Interest Ranking</Card.Title>
                    <Card.Text>Browse, select, and rank your interests</Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="default-view">
                <Card>
                  <Card.Body>
                    <Card.Title>Default View</Card.Title>
                    <Card.Text>Select whether "Dashboard View" or "Bulletin View" loads by default.</Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Row className="mt-3">
        <Col sm={{ span: 9, offset: 3 }}>
          <Button variant="danger">Log out</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
