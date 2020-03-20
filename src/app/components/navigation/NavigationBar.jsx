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
                <NavLink
                    className={isActive ? "" : "nav-el-inactive"}
                    to={to}
                >
                    {display}
                </NavLink>
            </li>
        )
    }

    return (
    <nav class="nav-color uk-navbar-container">
        <div class="uk-navbar-left">
            <div className="uk-grid uk-width-1-1">
                <div className="uk-width-1-4">
                {/* logo */}
                </div>
                <div className="uk-width-expand">
                    <ul class="uk-navbar-nav uk-text-bold">
                        <ListItemLink to="/cards" display="Featured" />
                        {/* <ListItemLink to="/search" display="Search" /> */}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    )
};

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;