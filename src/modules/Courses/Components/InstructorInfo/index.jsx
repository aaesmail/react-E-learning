import { Fragment } from 'react';

import Classes from './index.module.css';

const InstructorInfo = ({
  firstName,
  lastName,
  birthDate,
  email,
  background,
}) => {
  const birthDateFormatted = new Date(birthDate).toLocaleDateString();

  return (
    <div className={Classes.container}>
      <h3>About Instructor</h3>
      <div className={Classes.section}>
        <h5>
          Name:{' '}
          <b>
            {firstName} {lastName}
          </b>
        </h5>

        <h6 style={{ marginLeft: '30px' }}>
          Email: <b>{email}</b>
        </h6>

        <h6 style={{ marginLeft: '30px' }}>Birthdate: {birthDateFormatted}</h6>
      </div>

      {background ? (
        <Fragment>
          <h5>Background</h5>
          <h6>
            <i>{background}</i>
          </h6>
        </Fragment>
      ) : null}
    </div>
  );
};

export default InstructorInfo;
