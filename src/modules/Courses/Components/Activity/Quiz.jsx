import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

import Classes from './index.module.css';
import {
  deleteQuizActivity,
  takeQuiz,
} from '../../../../store/actions/courses';

const Quiz = ({
  id,
  courseId,
  ownsCourse,
  title,
  description,
  createdAt,
  grades,
  quiz,
  page,
}) => {
  const deletingActivity = useSelector(
    (state) => state.courses.deletingActivity,
  );

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteQuizActivity(courseId, id, page));
  };

  const navigate = useNavigate();

  const takeQuizHandler = () => {
    dispatch(takeQuiz(courseId, id, quiz, title, description));
    navigate('quiz');
  };

  const enrolledCourses = useSelector((state) => state.me.enrolledCourses);
  const userEnrolledInCourse = enrolledCourses.reduce(
    (prev, course) => prev || course.id === courseId,
    false,
  );
  const canTakeQuiz = !ownsCourse || userEnrolledInCourse;

  return (
    <div className={Classes.container}>
      <h5>
        {title} <i>({createdAt})</i>{' '}
        {ownsCourse ? (
          <Button
            disabled={deletingActivity === id}
            style={{ marginLeft: '10px' }}
            onClick={deleteHandler}
            variant="danger"
            size="sm"
          >
            {deletingActivity === id ? (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Deleting...</span>
              </Spinner>
            ) : (
              'Delete Quiz'
            )}
          </Button>
        ) : null}
      </h5>
      {grades.length > 0 ? <b>Grade: {Math.ceil(grades[0].grade)}%</b> : null}{' '}
      <span style={{ marginTop: '10px' }}>{description}</span>
      {canTakeQuiz ? (
        <span style={{ marginTop: '20px' }}>
          <Button onClick={takeQuizHandler} variant="primary">
            Take Quiz
          </Button>
        </span>
      ) : null}
    </div>
  );
};

export default Quiz;
