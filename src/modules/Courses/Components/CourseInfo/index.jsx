import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';

import Classes from './index.module.css';
import { editCourse } from '../../../../store/actions/courses';

const CourseInfo = ({ id, title, syllabus, createdAt, instructorId }) => {
  const userId = useSelector((state) => state.me.id);

  const [courseTitle, setCourseTitle] = useState(title);
  const [courseSyllabus, setCourseSyllabus] = useState(syllabus);
  const [editMode, setEditMode] = useState(false);

  const updatingCourse = useSelector((state) => state.courses.updatingCourse);

  const submitDisabled =
    updatingCourse ||
    !courseTitle ||
    !courseSyllabus ||
    (courseTitle === title && courseSyllabus === syllabus);

  const dispatch = useDispatch();
  const editHandler = (event) => {
    event.preventDefault();
    setEditMode(false);
    dispatch(editCourse(id, courseTitle, courseSyllabus));
  };

  return (
    <div className={Classes.container}>
      {editMode ? (
        <Form className={Classes.form}>
          <Form.Group className={Classes.group}>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              id="title"
              type="text"
              placeholder="Title"
              autoFocus
              value={courseTitle}
              onChange={(event) => setCourseTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ marginTop: '20px' }} className={Classes.group}>
            <Form.Label htmlFor="syllabus">Syllabus</Form.Label>
            <Form.Control
              id="syllabus"
              as="textarea"
              className={Classes.syllabus}
              placeholder="Syllabus"
              value={courseSyllabus}
              onChange={(event) => setCourseSyllabus(event.target.value)}
            />
          </Form.Group>

          <Button
            onClick={editHandler}
            variant="success"
            className={Classes.btn}
            disabled={submitDisabled}
            type="submit"
          >
            {updatingCourse ? (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Updating...</span>
              </Spinner>
            ) : (
              'Update Course'
            )}
          </Button>

          <Button
            type="button"
            className={Classes.btn}
            style={{ marginLeft: '10px' }}
            onClick={() => setEditMode(false)}
            variant="danger"
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <Fragment>
          <h2>{title}</h2>

          <h5 style={{ marginTop: '20px', marginBottom: '20px' }}>
            Created: <b>{new Date(createdAt).toLocaleDateString()}</b>
          </h5>

          <i style={{ display: 'block', marginBottom: '20px' }}>{syllabus}</i>

          {userId === instructorId ? (
            <Button onClick={() => setEditMode(true)} variant="primary">
              Edit Course
            </Button>
          ) : null}
        </Fragment>
      )}
    </div>
  );
};

export default CourseInfo;
