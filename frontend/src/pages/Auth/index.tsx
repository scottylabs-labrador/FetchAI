
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Session } from '@supabase/supabase-js';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'apple' });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (session) {
    return (
      <Container className="mt-5">
        <h1>Welcome, {session.user.email}</h1>
        <Button variant="primary" onClick={handleLogout}>Sign Out</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">Authentication</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Sign In</Button>
            </div>
          </Form>
          <div className="d-grid gap-2 mt-3">
            <Button variant="outline-dark" onClick={handleGoogleLogin}>Sign in with Google</Button>
            <Button variant="outline-dark" onClick={handleAppleLogin}>Sign in with Apple</Button>
          </div>
          <p className="text-center mt-3">New user? Sign up now</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
