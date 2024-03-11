import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisplay} from "@fortawesome/free-solid-svg-icons";
import { Button, Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";

const Header = ({ isLoggedIn, handleLogout }) => {
    console.log("isLoggedIn:", isLoggedIn);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'lightblue'}}>
                    <FontAwesomeIcon icon={faDisplay}/>Bindgeworthy.anime
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
                    </Nav>
                    {isLoggedIn ? (
                        <>
                            <Button onClick={handleLogout} variant="outline-info" className="me-2">Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button as={Link} to="/Login" variant="outline-info" className="me-2">Login</Button>
                            <Button as={Link} to="/Registration" variant="outline-info" className="me-2">Register</Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;