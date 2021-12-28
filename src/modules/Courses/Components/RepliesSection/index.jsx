import { useState } from 'react';
import { FormControl, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Classes from './index.module.css';
import { createReply } from '../../../../store/actions/comments';
import Reply from '../Reply';

const RepliesSection = ({ courseId, questionId, userIsInCourse, replies }) => {
  const [newReply, setNewReply] = useState('');

  const { creatingReply } = useSelector((state) => state.comments);

  const { firstName, lastName } = useSelector((state) => state.me);

  const dispatch = useDispatch();
  const createReplyHandler = () =>
    dispatch(createReply(courseId, questionId, newReply, firstName, lastName));

  const replyDisabled = creatingReply === questionId || !newReply;

  return (
    <div className={Classes.container}>
      {replies.map((reply) => (
        <Reply
          key={reply.id}
          id={reply.id}
          courseId={courseId}
          questionId={questionId}
          author={reply.author}
          userIsInCourse={userIsInCourse}
          reply={reply.reply}
          createdAt={reply.createdAt}
        />
      ))}

      {userIsInCourse ? (
        <div className={Classes.group}>
          <div className={Classes.inp}>
            <FormControl
              type="text"
              placeholder="Reply"
              value={newReply}
              onChange={(event) => setNewReply(event.target.value)}
            />

            <Button
              disabled={replyDisabled}
              className={Classes.btn}
              variant="primary"
              onClick={createReplyHandler}
            >
              {creatingReply === questionId ? (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Replying...</span>
                </Spinner>
              ) : (
                'Reply'
              )}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RepliesSection;
