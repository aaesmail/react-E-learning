import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/actions/auth';
import Classes from './index.module.css';
import brandImage from '../../images/brand.png';

const Header = () => {
  const { authenticated, admin, instructor } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => dispatch(logout(navigate));

  const links = [];

  const nonAuthenticatedLinks = [
    <Nav.Link key="login" as={Link} to="/auth/login">
      Login
    </Nav.Link>,

    <Nav.Link key="signup" as={Link} to="/auth/signup">
      Signup
    </Nav.Link>,
  ];

  const authenticatedLinks = [
    <Nav.Link key="allcourses" as={Link} to="/courses">
      All Courses
    </Nav.Link>,

    <Nav.Link key="me" as={Link} to="/me">
      Me
    </Nav.Link>,

    <Nav.Link key="logout" onClick={logoutHandler}>
      Logout
    </Nav.Link>,
  ];

  const adminLinks = [
    <Nav.Link key="admin" as={Link} to="/admin">
      Admin
    </Nav.Link>,
  ];

  const instructorAndAdminLinks = [
    <Nav.Link key="create" as={Link} to="/create">
      Create
    </Nav.Link>,
  ];

  if (authenticated) {
    if (admin) {
      links.push(...adminLinks);
    }
    if (instructor || admin) {
      links.push(...instructorAndAdminLinks);
    }

    links.push(...authenticatedLinks);
  } else {
    links.push(...nonAuthenticatedLinks);
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
            <Nav className={Classes.wrapper}>{links}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
