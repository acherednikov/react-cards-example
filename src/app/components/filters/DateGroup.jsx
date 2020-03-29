// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs
import DatePicker from 'react-datepicker';
import capitalize from 'lodash/capitalize';
// Components
// Services
import DateTimeService from '../../services/DateTimeService';


const propTypes = {
    date: PropTypes.object,
    date: PropTypes.object.isRequired,
    // from: PropTypes.object,
    // to: PropTypes.object,
    enabled: PropTypes.bool,
    handleChange: PropTypes.func,
};
const defaultProps = {
    date: new Date(),
    to: new Date(),
    enabled: true,
    handleChange: undefined,
};

const DateGroup = ({
                            date,
                            dateType,
                            enabled,
                            handleChange,
                        }) => {

    const dateFormated = (date = new Date()) => {
        return DateTimeService.dateFormat(date)
    };

    const handleDateChange = (date) => {
        handleChange(dateType, dateFormated(date))
    };
    
    return(
        <div className="uk-flex uk-flex-column">
            <p className="uk-text-bold" style={{ margin: '0 0 5px 0', color: 'black' }}>{capitalize(dateType)}</p>
            <DatePicker
                className="date-picker-input"
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                selected={date}
                onChange={date => handleDateChange(date)}
            />
        </div>
    )
};

DateGroup.propTypes = propTypes;
DateGroup.defaultProps = defaultProps;

export default DateGroup;