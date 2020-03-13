// React Core
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardsFetchRequested as cardsFetchAction,
} from '../redux/actions/cards';
// Selectors
import {
    cardsAsArray as cardsAsArraySelector,
} from '../selectors/card';
// Components
import Cards from '../components/Cards';


const propTypes = {
    cardsData: PropTypes.array,
    isLoadingCards: PropTypes.bool,
};
const defaultProps = {
    cardsData: [],
    isLoadingCards: false,
};


const CardsContainer = props => {
    const dispatch = useDispatch();

    const cardsData = useSelector(cardsAsArraySelector);
    const isLoadingCards = useSelector(state => state.cards.loading);

    useEffect(() => {
        dispatch(cardsFetchAction())
    }, [dispatch]);

    return (
        <Cards
            cardsData={cardsData}
            isLoading={isLoadingCards}
        />
    )

};

CardsContainer.propTypes = propTypes;
CardsContainer.defaultProps = defaultProps;

export default CardsContainer;