import { Card, Form, Button } from 'react-bootstrap';

import Classes from './index.module.css';

const Signup = () => {
  return (
    <div className={Classes.wrapper}>
      <Card>
        <Card.Header className={Classes.header}>Signup</Card.Header>
        <Card.Body>
          <Form className={Classes.form}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type="text" placeholder="Birth Date" />
            </Form.Group>

            <Button variant="primary" className={Classes.btn} type="submit">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
