import { Card, Form, Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { login } from '../../../store/actions/auth';
import Classes from './index.module.css';

const Login = () => {
  const dispatch = useDispatch();

  const asd = () => {
    dispatch(login('asd', 'asdas'));
  };

  return (
    <div className={Classes.wrapper}>
      <Card>
        <Card.Header className={Classes.header}>Login</Card.Header>
        <Card.Body>
          <Form className={Classes.form}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button
              onClick={asd}
              variant="primary"
              className={Classes.btn}
              type="button"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
