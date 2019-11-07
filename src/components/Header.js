import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import history from '../history';

const Header = props => {
    return (
        <Navbar bg={props.darkMode ? 'dark' : 'info'} variant="dark" expand="lg">
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

const mapStateToProps = state => {
    return { darkMode: state.darkMode };
}

export default connect(mapStateToProps)(Header);