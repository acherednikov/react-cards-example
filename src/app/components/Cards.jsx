// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs

// Components
import Card from './Card';

const propTypes = {
    cardsData: PropTypes.array.isRequired,
};
const defaultProps = {};


const Cards = ({
                   cardsData,
               }) => {

    const renderCard = ({ title, text }, index) => {
        return (
            <Card
                key={index}
                text={text}
                title={title}
            />
        )
    };

    return cardsData.map(renderCard);
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;