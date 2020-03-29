// React Core
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// Libs
import find from 'lodash/find';
// Components
import DateGroup from '../filters/DateGroup';
import SelectGroup from '../filters/SelectGroup';
// Hooks
import useNavigation from '../../hooks/useNavigation';
import useQueryParam from '../../hooks/useQueryParam';
// Services
import DateTimeService from '../../services/DateTimeService';
// Config
// Config
import {
    LANGUAGES,
    SORT,
    DEFAULT_LANGUAGE,
    DEFAULT_SORT,
} from '../../config/Conent';


const propTypes = {
    enabled: PropTypes.bool,
};
const defaultProps = {
    enabled: true,
};

//TODO range validations
const MenuAdvanced = ({ enabled }) => {
    const navigate = useNavigation();

    const searchQuery = useQueryParam('query', '');
    const language = useQueryParam('language', DEFAULT_LANGUAGE.value);
    const sort = useQueryParam('sort', DEFAULT_SORT.value);
    const dateFrom = useQueryParam('from', null);
    const dateTo = useQueryParam('to', null);

    const [searchInputValue, setSearchInputValue] = useState(searchQuery);

    useEffect(() => {
        setSearchInputValue(searchQuery);
        return () => {}
    }, [searchQuery, setSearchInputValue]);

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

    const dateFromParsed = dateParse(dateFrom);
    const dateToParsed = dateParse(dateTo);

    return (
        <Route exact path="/search">
            <div className="filters-card uk-flex-column uk-width-1-1 uk-margin-bottom">
                <div className="uk-width-1-1" style={{ paddingBottom: '15px' }}>
                    <input
                        className="nav-search-input uk-input"
                        type="text"
                        placeholder="..."
                        onChange={handleSearchInputChange}
                        onKeyPress={submitSearch}
                        value={searchInputValue}
                        disabled={!enabled}
                    />
                </div>
                <div className="uk-flex uk-flex-row" style={{ paddingBottom: '15px' }}>
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

                <div className="uk-flex uk-flex-row">
                    <div className="uk-width-1-2@s">
                        <DateGroup
                            date={dateFromParsed}
                            dateType="from"
                            handleChange={onChangeDate}
                        />
                    </div>
                    <div className="uk-width-1-2@s" style={{ marginLeft: '20px' }}>
                        <DateGroup
                            date={dateToParsed}
                            dateType="to"
                            handleChange={onChangeDate}
                        />
                    </div>
                </div>
                
            </div>
        </Route>
    )
}

MenuAdvanced.propTypes = propTypes;
MenuAdvanced.defaultProps = defaultProps;

export default MenuAdvanced;