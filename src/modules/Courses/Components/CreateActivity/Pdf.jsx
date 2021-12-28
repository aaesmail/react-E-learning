import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, Button, Spinner } from 'react-bootstrap';

import Classes from './index.module.css';
import { createPdfActivity } from '../../../../store/actions/courses';

const Pdf = ({ courseId, disableEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(undefined);

  const dispatch = useDispatch();
  const createHandler = () => {
    disableEdit();
    dispatch(createPdfActivity(courseId, title, description, file));
  };

  const loading = useSelector((state) => state.courses.creatingActivity);
  const createDisabled = loading || !title || !description || !file;

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
        value={fileName}
        onChange={(event) => {
          setFileName(event.target.value);
          setFile(event.target.files[0]);
        }}
        style={{ marginTop: '10px' }}
        type="file"
      />

      <div>
        <Button
          className={Classes.btn}
          style={{ marginTop: '20px' }}
          variant="success"
          type="submit"
          disabled={createDisabled}
          onClick={createHandler}
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
          type="button"
          onClick={disableEdit}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Pdf;
