// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
// Components
import Card from './Card';

const propTypes = {
    cardsData: PropTypes.array,
    isLoading: PropTypes.bool,
};
const defaultProps = {
    cardsData: [],
    isLoading: false,
};


const Cards = ({
                   cardsData,
                   isLoading,
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

    const cardsRenderer = cardsData.map(renderCard);

    return (
        <Container>
            <Row>
                {isLoading && <Spinner animation="border"/>}
                {!isLoading && cardsRenderer}
            </Row>
        </Container>
    )
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;