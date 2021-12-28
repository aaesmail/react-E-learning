import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';

import Classes from './index.module.css';
import Loading from '../../../Core/Loading';
import CourseInfo from '../Components/CourseInfo';
import InstructorInfo from '../Components/InstructorInfo';
import ActivitySection from '../Components/ActivitySection';
import CommentsSection from '../Components/CommentsSection';
import { fetchCurrentCourse } from '../../../store/actions/courses';

const Course = () => {
  const { courseId } = useParams();

  const { currentCourse, loading, error, loadingActivities } = useSelector(
    (state) => state.courses,
  );

  const [searchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentCourse(courseId, page));
  }, [dispatch, courseId, page]);

  if (error) {
    return <Navigate to="/404" />;
  }

  return loading && !loadingActivities ? (
    <Loading />
  ) : currentCourse ? (
    <div className={Classes.container}>
      <CourseInfo
        id={currentCourse.id}
        title={currentCourse.title}
        syllabus={currentCourse.syllabus}
        createdAt={currentCourse.createdAt}
        instructorId={currentCourse.instructor.id}
      />

      <InstructorInfo
        firstName={currentCourse.instructor.firstName}
        lastName={currentCourse.instructor.lastName}
        birthDate={currentCourse.instructor.birthDate}
        email={currentCourse.instructor.email}
        background={currentCourse.instructor.background}
      />

      <ActivitySection
        courseId={currentCourse.id}
        instructorId={currentCourse.instructor.id}
        activities={currentCourse.activities}
      />

      <CommentsSection
        courseId={currentCourse.id}
        instructorId={currentCourse.instructor.id}
      />
    </div>
  ) : null;
};

export default Course;
