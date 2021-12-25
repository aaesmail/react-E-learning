import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Classes from './index.module.css';
import Loading from '../../../Core/Loading';
import InstructorInfo from '../Components/InstructorInfo';
import { fetchCurrentCourse } from '../../../store/actions/courses';

const Course = () => {
  const { courseId } = useParams();

  const { currentCourse, loading, error, pages } = useSelector(
    (state) => state.courses,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentCourse(courseId));
  }, [dispatch, courseId]);

  return loading ? (
    <Loading />
  ) : error ? (
    <p className={Classes.error}>Couldn't fetch course!</p>
  ) : currentCourse ? (
    <div className={Classes.container}>
      <div className={Classes.instructor}>
        <InstructorInfo
          firstName={currentCourse.instructor.firstName}
          lastName={currentCourse.instructor.lastName}
          birthDate={currentCourse.instructor.birthDate}
          email={currentCourse.instructor.email}
          background={currentCourse.instructor.background}
        />
      </div>
    </div>
  ) : null;
};

export default Course;
