// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs
import isEmpty from 'lodash/isEmpty';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
// Components
import NavigationBar from '../navigation/NavigationBar';
import CardContainer from '../../containers/cards/CardContainer';

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
        <>
            <NavigationBar />
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
                    {
                        (isEmpty(cardsRenderer) && !isLoading) &&
                        <div>
                            No cards
                        </div>
                    }
                </Row>
            </Container>
        </>
    )
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;