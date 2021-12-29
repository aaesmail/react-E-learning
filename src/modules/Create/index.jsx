import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Classes from './index.module.css';
import { createCourse } from '../../store/actions/create';

const Create = () => {
  const [title, setTitle] = useState('');
  const [syllabus, setSyllabus] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createCourse(title, syllabus));
  };

  const submitDisabled = !title || !syllabus;

  const loading = useSelector((state) => state.create.loading);

  return (
    <div className={Classes.container}>
      <Form className={Classes.form}>
        <Form.Group className={Classes.spacetop}>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            id="title"
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Course Title"
            autoFocus
            value={title}
          />
        </Form.Group>

        <Form.Group className={Classes.syllabusgroup}>
          <Form.Label htmlFor="syllabus">Syllabus</Form.Label>
          <Form.Control
            id="syllabus"
            className={Classes.syllabus}
            onChange={(event) => setSyllabus(event.target.value)}
            as="textarea"
            placeholder="Syllabus"
            value={syllabus}
          />
        </Form.Group>

        <Button
          onClick={submitHandler}
          variant="primary"
          style={{ marginBottom: '30px' }}
          className={Classes.btn}
          disabled={submitDisabled}
          type="submit"
        >
          {loading ? (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            'Create Course'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Create;
