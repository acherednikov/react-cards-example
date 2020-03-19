// React Core
import React from 'react';
// import PropTypes from 'prop-types';
// React Router
import {
    useRouteMatch,
    NavLink,
} from 'react-router-dom';
// Libs
import get from 'lodash/get';


const propTypes = {

};
const defaultProps = {

};

const NavigationBar = props => {
    const match = get(useRouteMatch("/:match"), 'params.match', null);

    function ListItemLink({ to, display }) {
        const isActive = !!match ? to.includes(match) : to === '/' && match === null;

        return (
            <li className={isActive ? "uk-active" : ""}>
                <NavLink to={to}>{display}</NavLink>
            </li>
        )
    }

    return (
        <nav className="uk-navbar-container">
            <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                    <ListItemLink to="/" display="Home" />
                    <ListItemLink to="/bookmarks" display="Bookmarks" />
                    <ListItemLink to="/trash" display="Trash" />
                </ul>
            </div>
        </nav>
    )
};

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;