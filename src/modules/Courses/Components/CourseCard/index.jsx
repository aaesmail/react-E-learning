import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Classes from './index.module.css';

const CourseCard = ({ id, title, syllabus }) => {
  const navigate = useNavigate();
  const goToCourse = () => {
    navigate('/courses/' + id);
  };

  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title className={Classes.title}>{title}</Card.Title>
        <Card.Text className={Classes.title}>{syllabus}</Card.Text>
        <div className={Classes.title}>
          <Button onClick={goToCourse} variant="primary">
            View Course
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
