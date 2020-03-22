// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// Libs
import find from 'lodash/find';
// Components
import RadioGroup from '../../components/filters/RadioGroup';
import SelectGroup from '../../components/filters/SelectGroup';
// Hooks
import useNavigation from '../../hooks/useNavigation';
import useQueryParam from '../../hooks/useQueryParam';
// Config
import { TOPICS, COUNTRIES } from '../../config/Constants';


const propTypes = {
};
const defaultProps = {
};

const SideMenuFeatured = ({ enabled }) => {
    const navigate = useNavigation();

    const topic = useQueryParam('topic', 'general');
    const country = useQueryParam('country', 'ru');

    const onChangeCountry = ({ value }) => {
        navigate({ params: { country: value } })
    }

    const onChangeTopic = (name) => {
        navigate({ path: 'featured', params: { topic: name } })
    }

    const getCountryFromValue = () => {
    console.log('==>>> getCountryFromValue', { COUNTRIES,country})
        return find(COUNTRIES, { value: country })
    }

    return (
        <div className="filters-container">
            <Route exact path={["/", "/featured"]}>
                <div className="uk-margin">
                    <SelectGroup
                        filtersName="Countries"
                        filtersData={COUNTRIES}
                        activeOption={getCountryFromValue()}
                        enabled={enabled}
                        handleChange={onChangeCountry}
                    />
                </div>
                <RadioGroup
                    filtersName="Topics"
                    filtersData={TOPICS}
                    activeRadio={topic}
                    enabled={enabled}
                    handleChange={onChangeTopic}
                />
            </Route>
        </div>
    )
}

SideMenuFeatured.propTypes = propTypes;
SideMenuFeatured.defaultProps = defaultProps;

export default SideMenuFeatured;