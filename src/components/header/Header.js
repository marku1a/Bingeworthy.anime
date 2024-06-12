import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisplay} from "@fortawesome/free-solid-svg-icons";
import { Button, Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Logout from '../authentication/Logout';
import './Header.css';
import useAuth from '../../hooks/useAuth';

const Header = () => {

    const { auth } = useAuth();
    const { isAuthenticated, userId, role } = auth;

    return (
        <Navbar className="nav-custom" variant="dark" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'lightblue'}}>
                    <FontAwesomeIcon icon={faDisplay}/>Bindgeworthy.anime
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 nav-2"
                        navbarScroll
                    >
                    <NavLink className="nav-link link-custom" to="/" >Home</NavLink>
                    <NavLink className="nav-link link-custom" to="/anime-list">Anime List</NavLink>
                    {role === 'ROLE_ADMIN' && <NavLink className="nav-link link-custom" to="/user-list">User List</NavLink>}
                    </Nav>
                    <div className="d-flex ms-auto auth-custom">
                    {isAuthenticated ? (
                        <>
                          <Navbar.Text className="me-2 welcome-name" style={{"color":"white"}}>Welcome, {userId}!</Navbar.Text> 
                          <Logout/>
                        </>
                      ) : (
                        <>
                          <Button as={NavLink} to="/Login" variant="outline-info" className="me-2">Login</Button>
                          <Button as={NavLink} to="/Registration" variant="outline-info" className="me-2">Register</Button>
                        </>
                    )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
