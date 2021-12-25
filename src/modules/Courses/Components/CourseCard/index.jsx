import { Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteCourse } from '../../../../store/actions/courses';
import Classes from './index.module.css';

const CourseCard = ({ id, title, syllabus, instructor }) => {
  const navigate = useNavigate();
  const goToCourse = () => {
    navigate('/courses/' + id);
  };

  const userId = useSelector((state) => state.me.id);
  const deletingCourseId = useSelector((state) => state.courses.removingCourse);

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteCourse(id));
  };

  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title className={Classes.title}>{title}</Card.Title>
        <Card.Text className={Classes.title}>{syllabus}</Card.Text>
        <div className={Classes.btns}>
          <Button onClick={goToCourse} variant="primary">
            View Course
          </Button>

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
