import { Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Classes from './index.module.css';
import { deleteReply } from '../../../../store/actions/comments';

const Reply = ({
  id,
  courseId,
  questionId,
  author,
  userIsInCourse,
  reply,
  createdAt,
}) => {
  const dateCreated = new Date(createdAt);
  const formattedDate =
    ('00' + (dateCreated.getMonth() + 1)).slice(-2) +
    '/' +
    ('00' + dateCreated.getDate()).slice(-2) +
    '/' +
    dateCreated.getFullYear() +
    ', ' +
    ('00' + dateCreated.getHours()).slice(-2) +
    ':' +
    ('00' + dateCreated.getMinutes()).slice(-2) +
    ':' +
    ('00' + dateCreated.getSeconds()).slice(-2);

  const userId = useSelector((state) => state.me.id);
  const deletingReply = useSelector((state) => state.comments.deletingReply);

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteReply(courseId, questionId, id));
  };

  return (
    <div className={Classes.container}>
      <p>
        <i>
          {author.firstName} {author.lastName} ({formattedDate})
        </i>
        {author.id === userId && userIsInCourse ? (
          <Button
            disabled={deletingReply === id}
            style={{ marginLeft: '10px' }}
            onClick={deleteHandler}
            variant="danger"
            size="sm"
          >
            {deletingReply === id ? (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Deleting...</span>
              </Spinner>
            ) : (
              'Delete Reply'
            )}
          </Button>
        ) : null}
      </p>

      <p style={{ marginTop: '-15px' }}>{reply}</p>
    </div>
  );
};

export default Reply;
