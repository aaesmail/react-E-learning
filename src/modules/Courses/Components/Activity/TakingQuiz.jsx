import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { Button, FormCheck, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Classes from './index.module.css';
import { submitQuiz, endQuiz } from '../../../../store/actions/courses';

const TakingQuiz = () => {
  const mainObject = useSelector((state) => state.courses.takingQuiz);
  const loading = useSelector((state) => state.courses.submittingQuiz);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(
    mainObject && mainObject.quiz ? mainObject.quiz.map(() => -1) : [],
  );

  useEffect(() => {
    if (!mainObject) {
      toast.error("Please don't refresh while taking your quiz!");
    }
  });

  if (!mainObject) {
    return <Navigate to={`/courses/${courseId}`} />;
  }

  const { quizId, quiz, title, description } = mainObject;

  const handleSubmit = () => {
    dispatch(submitQuiz(courseId, quizId, answers, navigate));
  };

  const handleCancel = () => {
    dispatch(endQuiz());
    navigate(`/courses/${courseId}`);
  };

  const changeAnswer = (index, newValue) => {
    setAnswers(answers.map((answer, i) => (i === index ? newValue : answer)));
  };

  const submitDisabled = loading || answers.some((answer) => answer < 0);

  return (
    <div className={Classes.quiz}>
      <h3>{title}</h3>

      <h5 style={{ marginTop: '20px' }}>{description}</h5>

      <div className={Classes.questions}>
        {quiz.map((q, i) => (
          <div key={`q-${i}`} className={Classes.question}>
            <h5>{q.question}</h5>

            <div className={Classes.choices}>
              {q.choices.map((c, j) => (
                <FormCheck
                  key={`q-${i}-c-${j}`}
                  id={`q-${i}-c-${j}`}
                  name={`q-${i}-check`}
                  value={j}
                  label={c}
                  style={{ marginLeft: j === 0 ? '0' : '30px' }}
                  className={Classes.choice}
                  onChange={(event) => changeAnswer(i, +event.target.value)}
                  type="radio"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={Classes.buttons}>
        <Button
          className={Classes.btn}
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          {loading ? (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Submitting...</span>
            </Spinner>
          ) : (
            'Submit'
          )}
        </Button>

        <Button
          style={{ marginLeft: '10px' }}
          onClick={handleCancel}
          variant="danger"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TakingQuiz;
