import { useState, useEffect, useCallback } from 'react';
import { FormControl, Button, Spinner, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Classes from './index.module.css';
import Question from '../Question';
import {
  createQuestion,
  getAllQuestions,
} from '../../../../store/actions/comments';

const CommentsSection = ({ courseId, instructorId }) => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDesc, setQuestionDesc] = useState('');

  const { creatingQuestion, questions, pages, loading } = useSelector(
    (state) => state.comments,
  );

  const userId = useSelector((state) => state.me.id);
  const enrolledCourses = useSelector((state) => state.me.enrolledCourses);
  const userEnrolledInCourse = enrolledCourses.reduce(
    (prev, course) => prev || course.id === courseId,
    false,
  );
  const userIsInCourse = instructorId === userId || userEnrolledInCourse;

  const addDisabled = creatingQuestion || !questionTitle || !questionDesc;

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get('comment_page') || 1;
  const changePage = useCallback(
    (newPage) => {
      window.scrollTo(0, 0, 'smooth');
      setSearchParams({ comment_page: newPage });
    },
    [setSearchParams],
  );

  useEffect(() => {
    dispatch(getAllQuestions(courseId, page));
  }, [dispatch, courseId, page]);

  const { firstName, lastName } = useSelector((state) => state.me);

  const addQuestionhandler = () => {
    dispatch(
      createQuestion(
        courseId,
        questionTitle,
        questionDesc,
        page,
        firstName,
        lastName,
      ),
    );
  };

  const pagesArray = [
    <Pagination.Prev
      key="comments-prev"
      onClick={() => changePage(page - 1)}
      disabled={page === 1}
    />,
  ];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(
      <Pagination.Item
        key={'comments-' + i}
        active={i === page}
        onClick={() => changePage(i)}
      >
        {i}
      </Pagination.Item>,
    );
  }

  pagesArray.push(
    <Pagination.Next
      key="comments-next"
      onClick={() => changePage(page + 1)}
      disabled={page === pages}
    />,
  );

  return userIsInCourse || questions.length > 0 ? (
    <div className={Classes.container}>
      <h3 style={{ textAlign: 'center' }}>Questions</h3>

      {userIsInCourse && page === 1 ? (
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
                'Ask'
              )}
            </Button>
          </div>
        </div>
      ) : null}

      {!loading && page > pages
        ? setSearchParams({ comment_page: pages })
        : null}

      {questions.map((question) => (
        <Question
          key={question.id}
          authorId={question.author.id}
          courseId={courseId}
          questionId={question.id}
          authorName={
            question.author.firstName + ' ' + question.author.lastName
          }
          title={question.title}
          description={question.description}
          createdAt={question.createdAt}
          replies={question.replies}
          userIsInCourse={userIsInCourse}
          page={page}
        />
      ))}

      {pages > 1 ? (
        <div className={Classes.pagination}>
          <Pagination>{pagesArray}</Pagination>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default CommentsSection;
