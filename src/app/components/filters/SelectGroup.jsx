// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory  } from 'react-router-dom';
// Libs
import find from 'lodash/find';
import Select, { components } from 'react-select';
// Components
// Config


const propTypes = {
    filtersName: PropTypes.string.isRequired,
    filtersData: PropTypes.array.isRequired,
    activeOption: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    handleChange: PropTypes.func,
    optionRenderer: PropTypes.func,
};
const defaultProps = {
    enabled: true,
    handleChange: undefined,
    optionRenderer: undefined,
};

const SelectGroup = ({
                     filtersName,
                     filtersData,
                     activeOption,
                     enabled,
                     handleChange,
                     optionRenderer,
                    }) => {
    const history = useHistory();

    const handleOptionChange = (name) => {
        if (!enabled) return;
        handleChange(name)
    }

    const Option = props => { 
        return ( 
            <div>
                <components.Option {...props}>
                    {/* <img style={{ width: '25px', height: '25px' }} src={FLAG_ICONS[props.value]} /> */}
                    <label>{' ' + props.label}</label>
                </components.Option>
            </div>
        );
    };

    return (
        <div className="card-wrapper uk-card uk-card-default uk-border-rounded uk-box-shadow-medium">
            <div className="uk-card-body">
                <p className="uk-text-bold">{filtersName}</p>
                    <Select
                        value={activeOption}
                        isDisabled={!enabled}
                        onChange={handleOptionChange}
                        options={filtersData}
                        components={{ Option }}
                    />      
            </div>
            <div className="uk-card-footer">
                <p className="uk-text-meta">powered by <span className="news-api-logo uk-icon uk-icon-image"/></p>
            </div>
        </div>
    )
}

SelectGroup.propTypes = propTypes;
SelectGroup.defaultProps = defaultProps;

export default SelectGroup;