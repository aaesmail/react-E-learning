import { useSelector } from 'react-redux';

import Classes from './index.module.css';

const Me = () => {
  const { firstName, lastName, birthDate, email, type, username, background } =
    useSelector((state) => state.me);

  const bd = new Date(birthDate);

  const year = bd.getFullYear();
  const month = bd.getMonth() + 1;
  const day = bd.getDate();

  return (
    <div className={Classes.container}>
      <h3>
        Name: {firstName} {lastName}
      </h3>

      <h3>Username: {username}</h3>

      <h3>Type: {type}</h3>

      <h3>Email: {email}</h3>

      <h3>
        Birthdate: {day}/{month}/{year}
      </h3>

      {type === 'instructor' ? <h3>background: {background}</h3> : null}
    </div>
  );
};

export default Me;
