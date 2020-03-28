// React Core
import React from 'react';
// import PropTypes from 'prop-types';
// Redux
// import {  } from '../../redux/actions';
// React Router
import { useRouteMatch } from 'react-router-dom';
// Libs
import get from 'lodash/get';
// Hooks
import useNavigation from '../../hooks/useNavigation';
// Images
import logo from './logo.svg';


const propTypes = {

};
const defaultProps = {

};

const NavigationBar = props => {
    const navigate = useNavigation();

    const match = get(useRouteMatch("/:match"), 'params.match', null);

    function ListItemLink({ to, params, display }) {
        const isActive = !!match ? to.includes(match) : to === 'featured' && match === null;

        return (
            <li style={{ paddingRight: '30px' }}>
                <a
                    className={isActive ? "nav-el-active" : "nav-el-inactive"}
                    onClick={() => navigate({ path: to, params })}
                >
                    {/* <p style={{ borderBottom: '2px solid #d8d8d8' }}>{display}</p> */}
                    {display}
                </a>
            </li>
        )
    }

    return (
        <div className="nav-bar-themed">
            <div className="uk-width-1-1">
                <div className="uk-grid">
                    <div className="uk-width-1-4">
                        <img
                            className="uk-height-1-1"
                            style={{ maxHeight: '80px', cursor: 'pointer' }}
                            src={logo}
                            onClick={() => navigate({ path: 'featured', params: null })}
                        />
                    </div>
                    <div className="uk-navbar-item uk-flex-left uk-width-1-2" style={{ padding: '0 40px' }}>
                        {ListItemLink({ to: 'featured', params: null, display: 'Top News' })}
                        {ListItemLink({ to: 'search',  params: { query: 'All', topic: null, country: null }, display: 'Advanced Search' })}
                        <div className="uk-width-1-3 uk-padding-small">
                            {/* <button className="nav-bookmarks uk-button uk-button-primary uk-margin-medium-left">
                                <span uk-icon="bookmark"/>
                                Bookmarks
                            </button> */}
                        </div>
                    </div>
                    <div className="uk-width-1-4 uk-flex uk-flex-right">
                        <li className="uk-flex uk-flex-row uk-flex-middle" style={{ marginRight: '40px' }}>
                            <p className="uk-flex" style={{ marginRight: '10px', marginBottom: '0px' }}>powered by</p>
                            <span className="news-api-logo uk-icon uk-icon-image"/>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
};

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;