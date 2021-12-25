import { Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteCourse, enrollCourse } from '../../../../store/actions/courses';
import Classes from './index.module.css';

const CourseCard = ({ id, title, syllabus, instructor }) => {
  const navigate = useNavigate();
  const goToCourse = () => {
    navigate('/courses/' + id);
  };

  const userId = useSelector((state) => state.me.id);
  const enrolledCourses = useSelector((state) => state.me.enrolledCourses);
  const deletingCourseId = useSelector((state) => state.courses.removingCourse);
  const enrollingCourseId = useSelector(
    (state) => state.courses.enrollingCourse,
  );

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteCourse(id));
  };

  const enrollHandler = () => {
    dispatch(enrollCourse(id));
  };

  const userIsInCourse =
    instructor === userId ||
    enrolledCourses.reduce((prev, course) => prev || course.id === id, false);

  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title className={Classes.title}>{title}</Card.Title>
        <Card.Text className={Classes.title}>{syllabus}</Card.Text>
        <div className={Classes.btns}>
          {userIsInCourse ? (
            <Button onClick={goToCourse} variant="primary">
              View Course
            </Button>
          ) : (
            <Button onClick={enrollHandler} variant="success">
              {enrollingCourseId === id ? (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Enrolling...</span>
                </Spinner>
              ) : (
                'Enroll Now!'
              )}
            </Button>
          )}

          {instructor === userId ? (
            <Button
              disabled={deletingCourseId === id}
              onClick={deleteHandler}
              variant="danger"
            >
              {deletingCourseId === id ? (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Removing...</span>
                </Spinner>
              ) : (
                'Delete Course'
              )}
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
