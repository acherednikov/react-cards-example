// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory  } from 'react-router-dom';
// Libs
import find from 'lodash/find';
import DatePicker from 'react-datepicker';
// Components
// Services
import DateTimeService from '../../services/DateTimeService';
// Config


const propTypes = {
    from: PropTypes.object,
    to: PropTypes.object,
    enabled: PropTypes.bool,
    handleChange: PropTypes.func,
};
const defaultProps = {
    from: new Date(),
    to: new Date(),
    enabled: true,
    handleChange: undefined,
};

//TODO range validations
const DateRangeGroup = ({
                            from,
                            to,
                            enabled,
                            handleChange,
                        }) => {

    const dateFormated = (date = new Date()) => {
        return DateTimeService.dateFormat(date)
    }

    const handleDateChange = (type, date) => {
        handleChange(type, dateFormated(date))
    }

    return (
        <div className="card-wrapper uk-card uk-card-default uk-border-rounded uk-box-shadow-medium">
            <div className="uk-card-body">
                <div className="ux-flex ux-flex-column">
                    <p className="uk-text-bold">From</p>
                    <DatePicker
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a date"
                        selected={from}
                        onChange={date => handleDateChange('from', date)}
                    />
                    <p className="uk-text-bold">to</p>
                    <DatePicker
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a date"
                        selected={to}
                        onChange={date => handleDateChange('to', date)}
                    />
                </div>
            </div>
            <div className="uk-card-footer">
                <p className="uk-text-meta">powered by <span className="news-api-logo uk-icon uk-icon-image"/></p>
            </div>
        </div>
    )
}

DateRangeGroup.propTypes = propTypes;
DateRangeGroup.defaultProps = defaultProps;

export default DateRangeGroup;