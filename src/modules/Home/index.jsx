import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Classes from './index.module.css';
import HeroImage from '../../images/hero.jpg';

const Home = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);

  let content = (
    <div>
      <h2>Want to enroll in the best courses to help in your improvment?</h2>

      <h3>
        <Link className={Classes.link} to="/auth/signup">
          Signup
        </Link>{' '}
        now to get access to the best courses this world has to offer!
      </h3>

      <h6>
        Already a member?{' '}
        <Link className={Classes.link} to="/auth/login">
          Login
        </Link>{' '}
        Now!
      </h6>
    </div>
  );

  if (authenticated) {
    content = (
      <h2>
        Go to your{' '}
        <Button variant="outline-info" size="sm">
          <Link className="btn outline" to="/courses">
            courses
          </Link>
        </Button>{' '}
        to catch up!
      </h2>
    );
  }

  return (
    <div className={Classes.wrapper}>
      <img className={Classes.img} src={HeroImage} alt="Hero" />

      {content}
    </div>
  );
};

export default Home;
