// React Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardsFetchRequested as cardsFetchAction,
} from '../redux/actions/cards';
// Selectors
// Libs
// import axios from '../__mock__/axios';
// Components
import Cards from '../components/Cards';


const CardsContainer = props => {
    const dispatch = useDispatch();

    const cardsData = useSelector(state => state.cards.collection);
    const isLoadingCards = useSelector(state => state.cards.loading);

    useEffect(() => {
        dispatch(cardsFetchAction())
    }, []);

    return (
        <Cards
            cardsData={cardsData}
            isLoading={isLoadingCards}
        />
    )

};

export default CardsContainer;