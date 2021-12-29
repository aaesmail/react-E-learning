import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../../Core/Loading';

const CoursesList = lazy(() => import('./CoursesList'));
const Course = lazy(() => import('./Course'));
const TakingQuiz = lazy(() => import('./Components/Activity/TakingQuiz'));

const Courses = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="" element={<CoursesList />} />

        <Route path=":courseId/quiz" element={<TakingQuiz />} />

        <Route path=":courseId" element={<Course />} />
      </Routes>
    </Suspense>
  );
};

export default Courses;
