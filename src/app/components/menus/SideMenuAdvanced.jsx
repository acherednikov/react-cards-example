// React Core
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// Libs
import find from 'lodash/find';
// Components
import RadioGroup from '../../components/filters/RadioGroup';
import DateRangeGroup from '../../components/filters/DateRangeGroup';
import SelectGroup from '../../components/filters/SelectGroup';
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

const SideMenuAdvanced = ({ enabled }) => {
    const navigate = useNavigation();

    const language = useQueryParam('language', 'ru');
    const sort = useQueryParam('sort', 'publishedAt');
    const dateFrom = useQueryParam('from', null);
    const dateTo = useQueryParam('to', null);

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

    return (
        <div className="filters-container">
            <Route exact path="/search">
                <div className="uk-margin">
                    <SelectGroup
                        filtersName="Language"
                        filtersData={LANGUAGES}
                        activeOption={getLanguageFromValue()}
                        enabled={enabled}
                        handleChange={onChangeLanguage}
                    />
                </div>
                <div className="uk-margin">
                    <RadioGroup
                        filtersName="Sort"
                        filtersData={SORT}
                        activeRadio={sort}
                        enabled={enabled}
                        handleChange={onChangeSort}
                    />
                </div>
                <DateRangeGroup
                    from={dateParse(dateFrom)}
                    to={dateParse(dateTo)}
                    enabled={enabled}
                    handleChange={onChangeDate}
                />
            </Route>
        </div>
    )
}

SideMenuAdvanced.propTypes = propTypes;
SideMenuAdvanced.defaultProps = defaultProps;

export default SideMenuAdvanced;