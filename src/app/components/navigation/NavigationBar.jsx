// React Core
import React from 'react';
import PropTypes from 'prop-types';
// React Router
import { NavLink } from 'react-router-dom';
// Libs
import { Navbar, Nav } from 'react-bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';

const propTypes = {
};
const defaultProps = {
};

const NavigationBar = props => {

    return (
        <Navbar bg="dark" variant="dark">
            <NavLink
                to="/"
                className="nav-link"
            >
                Cards
            </NavLink>
            <Nav className="mr-auto">
                <NavLink
                    to="/bookmarks"
                    className="nav-link"
                >
                    Bookmarks
                </NavLink>
                <NavLink
                    to="/trash"
                    className="nav-link"
                >
                    Trash
                </NavLink>
            </Nav>
        </Navbar>
    )
};

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;