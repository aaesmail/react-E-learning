import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../../../store/actions/auth';
import Classes from './index.module.css';

const Signup = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
  });

  const signupHandler = (event) => {
    event.preventDefault();

    dispatch(signup(userInfo, navigate));
  };

  const submitDisabled =
    !userInfo.userName ||
    !userInfo.email ||
    !userInfo.password ||
    !userInfo.firstName ||
    !userInfo.lastName ||
    !userInfo.birthDate ||
    loading;

  return (
    <div className={Classes.wrapper}>
      <Card>
        <Card.Header className={Classes.header}>Signup</Card.Header>
        <Card.Body>
          <Form className={Classes.form}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                id="username"
                type="text"
                placeholder="Username"
                value={userInfo.userName}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, userName: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, email: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, password: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                id="firstName"
                type="text"
                placeholder="First Name"
                value={userInfo.firstName}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, firstName: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={userInfo.lastName}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, lastName: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="birthDate">Birth Date</Form.Label>
              <Form.Control
                id="birthDate"
                className={Classes.date}
                type="date"
                placeholder="Birth Date"
                value={userInfo.birthDate}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, birthDate: event.target.value })
                }
              />
            </Form.Group>

            {error && <div className="text-danger">{error}</div>}

            <Button
              variant="primary"
              className={Classes.btn}
              type="submit"
              disabled={submitDisabled}
              onClick={signupHandler}
            >
              {loading ? (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                'Signup'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
