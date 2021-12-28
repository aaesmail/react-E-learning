import { useState, useCallback } from 'react';
import { Button, FormSelect } from 'react-bootstrap';

import Classes from './index.module.css';
import Video from './Video';
import Pdf from './Pdf';
import Quiz from './Quiz';

const CreateActivity = ({ courseId }) => {
  const [editing, setEditing] = useState(false);
  const [type, setType] = useState('VideoActivity');

  const disableEditHandler = useCallback(() => setEditing(false), []);

  return (
    <div className={Classes.container}>
      {editing ? (
        <h3>Create New Activity</h3>
      ) : (
        <Button onClick={() => setEditing(true)}>Create New Activity</Button>
      )}

      {editing ? (
        <div>
          <FormSelect
            className={Classes.dropdown}
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="VideoActivity">Video</option>
            <option value="PdfActivity">Pdf</option>
            <option value="QuizActivity">Quiz</option>
          </FormSelect>

          {type === 'VideoActivity' ? (
            <Video courseId={courseId} disableEdit={disableEditHandler} />
          ) : type === 'PdfActivity' ? (
            <Pdf courseId={courseId} disableEdit={disableEditHandler} />
          ) : type === 'QuizActivity' ? (
            <Quiz />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CreateActivity;
