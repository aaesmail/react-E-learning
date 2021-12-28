import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, Button, Spinner } from 'react-bootstrap';

import Classes from './index.module.css';
import { createVideoActivity } from '../../../../store/actions/courses';

const Video = ({ courseId, disableEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();
  const createHandler = () => {
    disableEdit();
    dispatch(createVideoActivity(courseId, title, description, url));
  };

  const loading = useSelector((state) => state.courses.creatingActivity);
  const createDisabled = loading || !title || !description || !url;

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

      <FormControl
        type="text"
        placeholder="URL"
        style={{ marginTop: '10px' }}
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />

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

export default Video;
