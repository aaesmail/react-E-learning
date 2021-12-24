import { useParams } from 'react-router-dom';

const Course = () => {
  const { courseId } = useParams();

  return <div>Course {courseId}</div>;
};

export default Course;
