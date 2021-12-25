import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import CourseCard from '../Courses/Components/CourseCard';
import Classes from './index.module.css';

const Me = () => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
    type,
    username,
    background,
    ownedCourses,
  } = useSelector((state) => state.me);

  const birthDateFormatted = new Date(birthDate).toLocaleDateString();

  const showCourses = ownedCourses.map((course) => course);

  return (
    <div className={Classes.container}>
      <Card className={Classes.userInfo}>
        <Card.Body>
          <Card.Title className={Classes.info}>
            <h3>
              {firstName} {lastName}
            </h3>
          </Card.Title>
          <Card.Text className={Classes.info}>
            <b>Username:</b> <i>{username}</i>
          </Card.Text>
          <Card.Text className={Classes.info}>
            <b>Type:</b> <i>{type}</i>
          </Card.Text>
          <Card.Text className={Classes.info}>
            <b>Email:</b> <i>{email}</i>
          </Card.Text>
          <Card.Text className={Classes.info}>
            <b>Birthdate:</b> <i>{birthDateFormatted}</i>
          </Card.Text>
          {type === 'instructor' ? (
            <Card.Text className={Classes.info}>
              <b>Background:</b> <i>{background}</i>
            </Card.Text>
          ) : null}
        </Card.Body>
      </Card>

      {type === 'instructor' || type === 'admin' ? (
        <div>
          <h2
            style={{
              marginTop: '40px',
              marginBottom: '-40px',
              textAlign: 'center',
            }}
          >
            Owned Courses
          </h2>

          <div className={Classes.ownedCourses}>
            {ownedCourses.length > 0 ? (
              showCourses
                .reverse()
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    syllabus={course.syllabus}
                    instructor={course.instructor}
                  />
                ))
            ) : (
              <h4>No Courses Created Yet!</h4>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Me;
