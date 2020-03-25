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
import useNavigation from '../../hooks/useNavigation';
import useQueryParam from '../../hooks/useQueryParam';
// Images
import logo from './logo.svg';
import iconRu from './icon-ru.png';
import iconUs from './icon-us.png';

const FLAG_ICONS = { ru: iconRu, us: iconUs };


const propTypes = {

};
const defaultProps = {

};

const NavigationBar = props => {
    const history = useHistory();
    const navigate = useNavigation();

    const searchQuery = useQueryParam('query', '');

    const [searchinputValue, setSearchInputValue] = useState(searchQuery);
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
        setSearchInputValue(event.currentTarget.value)
    }

    const submitSearch = (event) => {
        const searchQuery = event.currentTarget.value;
        if (event.key === "Enter") {
            navigate({ path: 'search', params: { query: searchQuery, topic: null, country: null } })
        }
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
                        <div className="uk-width-1-3 uk-padding-small">
                            {/* <button className="nav-bookmarks uk-button uk-button-primary uk-margin-medium-left">
                                <span uk-icon="bookmark"/>
                                Bookmarks
                            </button> */}
                        </div>
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