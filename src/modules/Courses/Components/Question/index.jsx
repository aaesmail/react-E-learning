import Classes from './index.module.css';

const Question = ({
  courseId,
  questionId,
  title,
  description,
  createdAt,
  replies,
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

  return (
    <div className={Classes.container}>
      <p>
        <b style={{ fontSize: '20px', marginRight: '10px' }}>{title}</b>{' '}
        <i>({formattedDate})</i>
      </p>

      <p style={{ marginTop: '-15px' }}>{description}</p>
    </div>
  );
};

export default Question;
