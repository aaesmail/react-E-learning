import { useSelector, useDispatch } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';

import Classes from './index.module.css';
import { deletePdfActivity } from '../../../../store/actions/courses';

const Pdf = ({
  id,
  courseId,
  ownsCourse,
  title,
  description,
  createdAt,
  url,
  page,
}) => {
  const deletingActivity = useSelector(
    (state) => state.courses.deletingActivity,
  );

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deletePdfActivity(courseId, id, page));
  };

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
              'Delete Pdf'
            )}
          </Button>
        ) : null}
      </h5>

      <span>{description}</span>
      <span style={{ marginTop: '10px' }}>
        <b>
          <a
            className={Classes.link}
            href={process.env.REACT_APP_BASE_URL + url}
            rel="noreferrer"
            target="_blank"
          >
            Pdf
          </a>
        </b>
      </span>
    </div>
  );
};

export default Pdf;
