import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import history from '../history';

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand className="mr-auto">Herolo Weather Task</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Nav.Item className="mr-4">
                        <Nav.Link onClick={() => history.push('/')}><strong>Home</strong></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push('/favorites')}><strong>Favorites</strong></Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
export default Header;