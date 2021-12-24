import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';

import { changeRole } from '../../store/actions/admin';
import Classes from './index.module.css';

const Admin = () => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('learner');
  const [background, setBackground] = useState('');

  const loading = useSelector((state) => state.admin.loading);

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(changeRole(userId, role, background));
  };

  const submitDisabled = !userId || !role;

  return (
    <div className={Classes.container}>
      <Form className={Classes.form}>
        <Form.Group className={Classes.userid}>
          <Form.Label>User ID</Form.Label>
          <Form.Control
            onChange={(event) => setUserId(event.target.value)}
            type="text"
            placeholder="User ID"
            value={userId}
          />
        </Form.Group>

        {role === 'instructor' ? (
          <Form.Group className={Classes.backgroundgroup}>
            <Form.Label>Background</Form.Label>
            <Form.Control
              className={Classes.background}
              onChange={(event) => setBackground(event.target.value)}
              as="textarea"
              placeholder="Background"
              value={background}
            />
          </Form.Group>
        ) : null}

        <Form.Group className={Classes.checkbox}>
          <Form.Check
            id="learner-select"
            inline
            name="group"
            type="radio"
            label="learner"
            defaultChecked
            onChange={(event) => setRole(event.target.value)}
            value="learner"
          />

          <Form.Check
            id="instructor-select"
            inline
            name="group"
            type="radio"
            label="instructor"
            onChange={(event) => setRole(event.target.value)}
            value="instructor"
          />

          <Form.Check
            id="admin-select"
            inline
            name="group"
            type="radio"
            label="admin"
            onChange={(event) => setRole(event.target.value)}
            value="admin"
          />
        </Form.Group>

        <Button
          onClick={submitHandler}
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
            'Change Role'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Admin;
