import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Spinner } from 'react-bootstrap';

import Classes from './index.module.css';
import CreateActivity from '../CreateActivity';
import Activity from '../Activity';
import { loadActivities } from '../../../../store/actions/courses';

const ActivitySection = ({ courseId, instructorId, activities }) => {
  const userId = useSelector((state) => state.me.id);
  const pages = useSelector((state) => state.courses.pages);
  const loading = useSelector((state) => state.courses.loadingActivities);

  const userOwnsCourse = instructorId === userId;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1;

  const dispatch = useDispatch();
  const changePage = useCallback(
    (newPage) => {
      dispatch(loadActivities());
      window.scrollTo(0, 0, 'smooth');
      setSearchParams({ page: newPage });
    },
    [setSearchParams, dispatch],
  );

  const pagesArray = [
    <Pagination.Prev
      key="prev"
      onClick={() => changePage(page - 1)}
      disabled={page === 1}
    />,
  ];
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

  pagesArray.push(
    <Pagination.Next
      key="next"
      onClick={() => changePage(page + 1)}
      disabled={page === pages}
    />,
  );

  return loading ? (
    <div className={Classes.loading}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className={Classes.container}>
      {userId === instructorId && page === 1 ? (
        <CreateActivity courseId={courseId} />
      ) : null}

      {activities.map((activity) => (
        <Activity
          key={activity.id}
          courseId={courseId}
          ownsCourse={userOwnsCourse}
          activity={activity}
        />
      ))}

      {pages > 1 ? (
        <div className={Classes.pagination}>
          <Pagination>{pagesArray}</Pagination>
        </div>
      ) : null}
    </div>
  );
};

export default ActivitySection;
