// React Core
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
// import {  } from '../../redux/actions';
// import PropTypes from 'prop-types';
// React Router
// import {
//     useRouteMatch,
//     NavLink,
// } from 'react-router-dom';
// Hooks
import useQueryParam from '../../hooks/useQueryParam';
// Services
import NavigationService from '../../services/NavigationService';
import logo from './logo.svg';


const propTypes = {

};
const defaultProps = {

};

const NavigationBar = props => {
    const history = useHistory();
    const searchQuery = useQueryParam('query', '');

    const [searchinputValue, setSearchinputValue] = useState(searchQuery);
    // const match = get(useRouteMatch("/:match"), 'params.match', null);

    // function ListItemLink({ to, display }) {
    //     const isActive = !!match ? to.includes(match) : to === '/' && match === null;

    //     return (
    //         <li className={isActive ? "uk-active" : ""}>
    //             <NavLink
    //                 className={isActive ? "nav-el-inactive" : "nav-el-inactive"}
    //                 to={to}
    //             >
    //                 {/* <p style={{ borderBottom: '2px solid #d8d8d8' }}>{display}</p> */}
    //                 {display}
    //             </NavLink>
    //         </li>
    //     )
    // }
    const handleSearchInputChange = (event) => {
        setSearchinputValue(event.currentTarget.value)
    }

    const submitSearch = (event) => {
        const searchQuery = event.currentTarget.value;

        if (event.key === "Enter") NavigationService.navigate(history, 'search', {query: searchQuery, topic: null})
    }

    return (
        <div className="nav-color ">
            <div className="uk-width-1-1">
                <div className="uk-grid">
                    <div className="uk-width-1-4">
                        <img
                            style={{ maxHeight: '80px', cursor: 'pointer' }}
                            src={logo}
                            onClick={() => history.push('/')}
                        />
                    </div>
                    <div className="uk-navbar-item uk-flex-left uk-width-1-2" style={{ padding: '0 40px' }}>
                        <input
                            className="nav-search-input uk-input uk-width-1-2"
                            type="text"
                            placeholder="..."
                            onChange={handleSearchInputChange}
                            onKeyPress={submitSearch}
                            value={searchinputValue}
                        />
                        <p>
                            <button className="nav-bookmarks uk-button uk-button-primary uk-margin-medium-left">
                                <span uk-icon="bookmark"/>
                                Bookmarks
                            </button>
                        </p>
                    </div>
                    <div className="uk-width-1-4">
                    </div>
                </div>
            </div>
        </div>
    )
};

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;