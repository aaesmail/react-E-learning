import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { login, resetAuth } from '../../../store/actions/auth';
import Classes from './index.module.css';

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => dispatch(resetAuth()), [dispatch]);

  useEffect(() => {
    const authError = localStorage.getItem('authError');

    if (authError) {
      localStorage.removeItem('authError');

      toast.error('Authentication Error!');
    }
  }, []);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const submitDisabled = !userName || !password || loading;

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(login({ userName, password }, navigate));
  };

  return (
    <div className={Classes.wrapper}>
      <Card>
        <Card.Header className={Classes.header}>Login</Card.Header>
        <Card.Body>
          <Form className={Classes.form}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                id="username"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <div
              style={{ visibility: error ? 'visible' : 'hidden' }}
              className={`text-danger ${Classes.error}`}
            >
              {error}
            </div>

            <Button
              onClick={loginHandler}
              variant="primary"
              className={Classes.btn}
              disabled={submitDisabled}
              type="submit"
            >
              {loading ? (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
