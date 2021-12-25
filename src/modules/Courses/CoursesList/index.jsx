import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

import Classes from './index.module.css';
import Loading from '../../../Core/Loading';
import CourseCard from '../Components/CourseCard';
import { getCourses } from '../../../store/actions/courses';

const CoursesList = () => {
  const { loading, error, courses, pages } = useSelector(
    (state) => state.courses,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const changePage = useCallback(
    (newPage) => {
      setSearchParams({ page: newPage });
    },
    [setSearchParams],
  );

  const page = +searchParams.get('page') || 1;

  const pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(
      <Pagination.Item
        key={i}
        active={i === page}
        onClick={() => changePage(i)}
      >
        {i}
      </Pagination.Item>,
    );
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses(page));
  }, [dispatch, page]);

  return loading ? (
    <Loading />
  ) : (
    <div className={Classes.container}>
      {error ? (
        <p className={Classes.error}>Couldn't fetch courses!</p>
      ) : (
        <div>
          <div className={Classes.ownedCourses}>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                syllabus={course.syllabus}
              />
            ))}
          </div>

          <div className={Classes.pagination}>
            <Pagination>{pagesArray}</Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesList;
