import { useState, useEffect } from 'react';
import { FormControl, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Classes from './index.module.css';
import Question from '../Question';
import {
  createQuestion,
  getAllQuestions,
} from '../../../../store/actions/comments';

const CommentsSection = ({ courseId }) => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDesc, setQuestionDesc] = useState('');

  const { creatingQuestion, questions } = useSelector(
    (state) => state.comments,
  );

  const addDisabled = creatingQuestion || !questionTitle || !questionDesc;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuestions(courseId));
  }, [dispatch, courseId]);

  const addQuestionhandler = () => {
    dispatch(createQuestion(courseId, questionTitle, questionDesc));
  };

  return (
    <div className={Classes.container}>
      <h3 style={{ textAlign: 'center' }}>Questions</h3>

      {questions.map((question) => (
        <Question
          key={question.id}
          courseId={courseId}
          questionId={question.id}
          title={question.title}
          description={question.description}
          createdAt={question.createdAt}
          replies={question.replies}
        />
      ))}

      <div className={Classes.group}>
        Add a new Question
        <div className={Classes.inp}>
          <FormControl
            type="text"
            placeholder="Title"
            value={questionTitle}
            onChange={(event) => setQuestionTitle(event.target.value)}
          />

          <FormControl
            type="text"
            placeholder="Description"
            style={{ marginLeft: '10px' }}
            value={questionDesc}
            onChange={(event) => setQuestionDesc(event.target.value)}
          />

          <Button
            disabled={addDisabled}
            className={Classes.btn}
            variant="primary"
            onClick={addQuestionhandler}
          >
            {creatingQuestion ? (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Creating...</span>
              </Spinner>
            ) : (
              'Add'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
