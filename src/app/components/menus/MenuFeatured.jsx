// React Core
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// Libs
import find from 'lodash/find';
// Components
import SelectGroup from '../filters/SelectGroup';
// Hooks
import useNavigation from '../../hooks/useNavigation';
import useQueryParam from '../../hooks/useQueryParam';
// Config
import {
    TOPICS,
    COUNTRIES,
    DEFAULT_TOPIC,
    DEFAULT_COUNTRY,
} from '../../config/Conent';


const propTypes = {
    enabled: PropTypes.bool,
};
const defaultProps = {
    enabled: true,
};

const MenuFeatured = ({ enabled }) => {
    const navigate = useNavigation();

    const topic = useQueryParam('topic', DEFAULT_TOPIC.value);
    const country = useQueryParam('country',  DEFAULT_COUNTRY.value);

    const onChangeCountry = (country) => {
        navigate({ params: { country } })
    };

    const onChangeTopic = (topic) => {
        navigate({ path: 'featured', params: { topic } })
    };

    const getCountryFromValue = () => {
        return find(COUNTRIES, { value: country })
    };

     const getTopicFromValue = () => {
        return find(TOPICS, { value: topic })
    };

    return (
        <Route exact path={["/", "/featured"]}>
            <div className="filters-card uk-flex-inline uk-width-1-1 uk-margin-bottom">
                <div class="uk-width-1-2@s">
                    <SelectGroup
                        filtersName="Country"
                        filtersData={COUNTRIES}
                        activeOption={getCountryFromValue()}
                        enabled={enabled}
                        handleChange={onChangeCountry}
                    />
                </div>
                <div class="uk-width-1-2@s" style={{ marginLeft: '20px' }}>
                    <SelectGroup
                        filtersName="Topics"
                        filtersData={TOPICS}
                        activeOption={getTopicFromValue()}
                        enabled={enabled}
                        handleChange={onChangeTopic}
                    />
                </div>
            </div>
        </Route>
    )
}

MenuFeatured.propTypes = propTypes;
MenuFeatured.defaultProps = defaultProps;

export default MenuFeatured;