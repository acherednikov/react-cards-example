// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
// import Col from 'react-bootstrap/Col';
// Components
import CardContainer from '../containers/CardContainer';

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

    const renderCard = ({ id, title, text }) => {
        return (
            <CardContainer
                key={id}
                id={id}
                text={text}
                title={title}
            />
        )
    };

    const cardsRenderer = cardsData.map(renderCard);

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row>
                {
                    isLoading &&
                    <Spinner animation="border"/>
                }
                {
                    !isLoading &&
                    cardsRenderer
                }
            </Row>
        </Container>
    )
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;