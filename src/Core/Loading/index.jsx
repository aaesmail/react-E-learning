import Spinner from 'react-bootstrap/Spinner';

import Classes from './index.module.css';

const Loading = () => {
  return (
    <div className={Classes.wrapper}>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
