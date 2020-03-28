// React Core
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// Libs
import find from 'lodash/find';
// Components
import RadioGroup from '../filters/RadioGroup';
import DateRangeGroup from '../filters/DateRangeGroup';
import SelectGroup from '../filters/SelectGroup';
// Hooks
import useNavigation from '../../hooks/useNavigation';
import useQueryParam from '../../hooks/useQueryParam';
// Services
import DateTimeService from '../../services/DateTimeService';
// Config
import { SORT, LANGUAGES } from '../../config/Constants';


const propTypes = {
    enabled: PropTypes.bool,
};
const defaultProps = {
    enabled: true,
};

const MenuAdvanced = ({ enabled }) => {
    const navigate = useNavigation();

    const searchQuery = useQueryParam('query', '');
    const language = useQueryParam('language', 'ru');
    const sort = useQueryParam('sort', 'publishedAt');
    const dateFrom = useQueryParam('from', null);
    const dateTo = useQueryParam('to', null);

    const [searchInputValue, setSearchInputValue] = useState(searchQuery);

    const handleSearchInputChange = (event) => {
        setSearchInputValue(event.currentTarget.value)
    };

    const submitSearch = (event) => {
        const searchQuery = event.currentTarget.value;
        if (event.key === "Enter") {
            navigate({ path: 'search', params: { query: searchQuery, topic: null, country: null } })
        }
    };

    const dateParse = (date) => {
        return DateTimeService.dateParse(date)
    }

    const onChangeLanguage = (language) => {
        navigate({ path: 'search', params: { language } })
    }

    const onChangeSort = (sort) => {
        navigate({ path: 'search', params: { sort } })
    }

    const onChangeDate = (type, date) => {
        navigate({ path: 'search', params: { [type]: date } })
    }
    
    const getLanguageFromValue = () => {
        return find(LANGUAGES, { value: language })
    }

    const getSortFromValue = () => {
        return find(SORT, { value: sort })
    }

    return (
        <Route exact path="/search">
            <div className="filters-card uk-flex-inline uk-width-1-1 uk-margin-bottom">
                <div className="uk-width-1-1">
                    <input
                        className="nav-search-input uk-input"
                        type="text"
                        placeholder="..."
                        onChange={handleSearchInputChange}
                        onKeyPress={submitSearch}
                        value={searchInputValue}
                    />
                </div>
                <div className="uk-width-1-2@s">
                    <SelectGroup
                        filtersName="Language"
                        filtersData={LANGUAGES}
                        activeOption={getLanguageFromValue()}
                        enabled={enabled}
                        handleChange={onChangeLanguage}
                    />
                </div>
                <div class="uk-width-1-2@s" style={{ marginLeft: '20px' }}>
                    <SelectGroup
                        filtersName="Sort"
                        filtersData={SORT}
                        activeOption={getSortFromValue()}
                        enabled={enabled}
                        handleChange={onChangeSort}
                    />
                </div>
            </div>
        </Route>
    )

    // return (
    //     <div className="filters-container">
    //         <Route exact path="/search">
    //             <div className="uk-margin">
    //                 <SelectGroup
    //                     filtersName="Language"
    //                     filtersData={LANGUAGES}
    //                     activeOption={getLanguageFromValue()}
    //                     enabled={enabled}
    //                     handleChange={onChangeLanguage}
    //                 />
    //             </div>
    //             <div className="uk-margin">
    //                 <RadioGroup
    //                     filtersName="Sort"
    //                     filtersData={SORT}
    //                     activeRadio={sort}
    //                     enabled={enabled}
    //                     handleChange={onChangeSort}
    //                 />
    //             </div>
    //             <DateRangeGroup
    //                 from={dateParse(dateFrom)}
    //                 to={dateParse(dateTo)}
    //                 enabled={enabled}
    //                 handleChange={onChangeDate}
    //             />
    //         </Route>
    //     </div>
    // )
}

MenuAdvanced.propTypes = propTypes;
MenuAdvanced.defaultProps = defaultProps;

export default MenuAdvanced;