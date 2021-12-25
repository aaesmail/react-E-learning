import Classes from './index.module.css';

const InstructorInfo = ({
  firstName,
  lastName,
  birthDate,
  email,
  background,
}) => {
  return (
    <div className={Classes.container}>
      <div>
        <div>
          {firstName} {lastName}
        </div>
        <div>{background}</div>
        <div>{email}</div>
        <div>{birthDate}</div>
      </div>
    </div>
  );
};

export default InstructorInfo;
