import Video from './Video';
import Pdf from './Pdf';
import Quiz from './Quiz';

const Activity = ({ courseId, ownsCourse, activity, page }) => {
  const dateCreated = new Date(activity.createdAt);
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

  return activity.type === 'VideoActivity' ? (
    <Video
      id={activity.id}
      courseId={courseId}
      ownsCourse={ownsCourse}
      title={activity.title}
      description={activity.description}
      createdAt={formattedDate}
      url={activity.url}
      page={page}
    />
  ) : activity.type === 'PdfActivity' ? (
    <Pdf
      id={activity.id}
      courseId={courseId}
      ownsCourse={ownsCourse}
      title={activity.title}
      description={activity.description}
      createdAt={formattedDate}
      url={activity.url}
      page={page}
    />
  ) : activity.type === 'QuizActivity' ? (
    <Quiz
      id={activity.id}
      courseId={courseId}
      ownsCourse={ownsCourse}
      title={activity.title}
      description={activity.description}
      createdAt={formattedDate}
      grades={activity.grades}
      quiz={activity.quiz}
      page={page}
    />
  ) : (
    <div>Unknown Activity</div>
  );
};

export default Activity;
