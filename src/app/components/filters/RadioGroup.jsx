// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory  } from 'react-router-dom';
// Libs
// Components
// Config


const propTypes = {
    filtersName: PropTypes.string.isRequired,
    filtersData: PropTypes.array.isRequired,
    activeRadio: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    handleChange: PropTypes.func,
};
const defaultProps = {
    enabled: true,
    handleChange: () => {},
};

const RadioGroup = ({
                     filtersName,
                     filtersData,
                     activeRadio,
                     enabled,
                     handleChange,
                    }) => {
    const history = useHistory();

    const isRadioActive = (name) => {
        return activeRadio === name
    }

    const handleRadioChange = (name) => {
        if (!enabled) return;
        handleChange(name)
    }

    const renderRadio = ({ name, icon }) => {
        const checked = isRadioActive(name);

        return (
            <div
                key={name}
                className="uk-flex-row uk-width-1-1"
                style={{ cursor: 'pointer' }}
                onClick={() => handleRadioChange(name)}
            >
                <label
                    className="uk-text-capitalize uk-text-emphasis"
                    style={{ cursor: 'pointer' }}
                >
                    <input
                        className="uk-radio uk-margin-right"
                        type="radio"
                        checked={checked}
                        disabled={!enabled}
                        onChange={() => {}}
                    />
                    {
                        !!icon &&
                        <span
                            className="uk-margin-right"
                            style={{ color: 'rgb(163, 133, 154)' }}
                            uk-icon={icon}
                        />
                    }
                    {name}
                </label>
            </div>
        )
    }

    const radiosRenderer = filtersData.map(renderRadio)

    return (
        <div className="card-wrapper uk-card uk-card-default uk-border-rounded uk-box-shadow-medium">
            <div className="uk-card-body">
                <p className="uk-text-bold">{filtersName}</p>
                <div className="uk-flex-column">
                    {radiosRenderer}
                </div>
            </div>
            <div className="uk-card-footer">
                <p className="uk-text-meta">powered by <span className="news-api-logo uk-icon uk-icon-image"/></p>
            </div>
        </div>
    )
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;