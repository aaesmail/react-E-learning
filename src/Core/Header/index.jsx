import { Fragment } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/actions/auth';
import Classes from './index.module.css';
import brandImage from '../../images/brand.png';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(logout());

  let navLinks;

  if (isAuthenticated) {
    navLinks = (
      <Fragment>
        <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
      </Fragment>
    );
  } else {
    navLinks = (
      <Fragment>
        <Nav.Link as={Link} to="/auth/login">
          Login
        </Nav.Link>

        <Nav.Link as={Link} to="/auth/signup">
          Signup
        </Nav.Link>
      </Fragment>
    );
  }

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img height={30} src={brandImage} alt="Brand" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={Classes.wrapper}>{navLinks}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
