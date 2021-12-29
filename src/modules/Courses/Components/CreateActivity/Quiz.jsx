import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormCheck, Button, Spinner } from 'react-bootstrap';

import Classes from './index.module.css';
import { createQuizActivity } from '../../../../store/actions/courses';

const Quiz = ({ courseId, disableEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quiz, setQuiz] = useState([]);

  const dispatch = useDispatch();
  const createHandler = () => {
    disableEdit();

    const quizQuestions = quiz.map((q) => ({
      question: q.question,
      choices: q.choices.map((c) => c.tex),
    }));

    const quizAnswers = quiz.map((q) => q.answer);

    dispatch(
      createQuizActivity(
        courseId,
        title,
        description,
        quizQuestions,
        quizAnswers,
      ),
    );
  };

  const addQuestion = () => {
    setQuiz([
      ...quiz,
      { id: new Date().getTime(), question: '', choices: [], answer: -1 },
    ]);
  };

  const removeQuestion = (index) => {
    setQuiz(quiz.filter((_, i) => i !== index));
  };

  const addChoice = (index) => {
    setQuiz(
      quiz.map((q, i) =>
        i === index
          ? {
              ...q,
              choices: [...q.choices, { tex: '', id: new Date().getTime() }],
            }
          : q,
      ),
    );
  };

  const removeChoice = (index, choiceIndex) => {
    setQuiz(
      quiz.map((q, i) =>
        i === index
          ? { ...q, choices: q.choices.filter((_, i) => i !== choiceIndex) }
          : q,
      ),
    );
  };

  const changeChoice = (index, cIndex, newVal) => {
    setQuiz(
      quiz.map((q, i) =>
        i === index
          ? {
              ...q,
              choices: q.choices.map((c, j) =>
                j === cIndex ? { ...c, tex: newVal } : c,
              ),
            }
          : q,
      ),
    );
  };

  const changeAnswer = (index, newVal) => {
    setQuiz(quiz.map((q, i) => (i === index ? { ...q, answer: newVal } : q)));
  };

  const loading = useSelector((state) => state.courses.creatingActivity);
  const createDisabled =
    loading ||
    !title ||
    !description ||
    quiz.length < 1 ||
    quiz.some(
      (q) =>
        !q.question ||
        q.answer < 0 ||
        q.choices.length < 2 ||
        q.choices.some((c) => !c.tex),
    );

  return (
    <div className={Classes.group}>
      <FormControl
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <FormControl
        type="text"
        placeholder="Description"
        style={{ marginTop: '10px' }}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {quiz.map((question, i) => (
        <div key={question.id}>
          <div className={Classes.question}>
            <FormControl
              type="text"
              placeholder="Question"
              value={question.question}
              onChange={(event) =>
                setQuiz(
                  quiz.map((q, j) =>
                    i === j ? { ...q, question: event.target.value } : q,
                  ),
                )
              }
            />

            <Button style={{ marginLeft: '10px' }} onClick={() => addChoice(i)}>
              Add Choice
            </Button>

            <Button
              variant="danger"
              style={{ marginLeft: '10px' }}
              onClick={() => removeQuestion(i)}
            >
              Remove Question
            </Button>
          </div>

          <div className={Classes.choices}>
            {question.choices.map((choice, j) => (
              <div key={choice.id} className={Classes.choice}>
                <span
                  onClick={() => removeChoice(i, j)}
                  className={Classes.delIcon}
                >
                  X
                </span>
                <FormControl
                  style={{ marginRight: '10px' }}
                  type="text"
                  placeholder="Choice"
                  value={choice.tex}
                  onChange={(event) => changeChoice(i, j, event.target.value)}
                />
                <FormCheck
                  name={question.id + '-check'}
                  value={j}
                  onChange={(event) => changeAnswer(i, +event.target.value)}
                  type="radio"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button style={{ marginTop: '20px' }} onClick={addQuestion}>
        Add Question
      </Button>

      <div>
        <Button
          className={Classes.btn}
          style={{ marginTop: '20px' }}
          variant="success"
          onClick={createHandler}
          disabled={createDisabled}
        >
          {loading ? (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Creating...</span>
            </Spinner>
          ) : (
            'Create'
          )}
        </Button>

        <Button
          style={{ marginLeft: '10px', marginTop: '20px' }}
          variant="danger"
          onClick={disableEdit}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
