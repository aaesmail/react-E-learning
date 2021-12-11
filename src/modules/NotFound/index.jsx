import { Link } from 'react-router-dom';

import Classes from './index.module.css';

const NotFound = () => {
  return (
    <div id={Classes.notfound} className="bg-light">
      <div className={Classes.notfound}>
        <div className={Classes.notfound404}>
          <h1>
            4<span>0</span>4
          </h1>
        </div>

        <h2>We can't find that page</h2>

        <p className="text-info">
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it's behalf.
        </p>

        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
