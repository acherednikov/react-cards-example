// React Core
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// React Router
import { useRouteMatch } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    cardsFetchRequested as cardsFetchAction,
} from '../../redux/actions/cards';
// Selectors
import {
    cardsAsArray as cardsAsArraySelector,
} from '../../selectors/card';
// Libs
import get from 'lodash/get';
// Libs
import { ToastContainer } from 'react-toastify';
// Components
import Cards from '../../components/cards/Cards';


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

    const match = get(useRouteMatch("/:match"), 'params.match', null);

    const cardsData = useSelector(state => cardsAsArraySelector(state, match));
    const isLoadingCards = useSelector(state => state.cards.isFetching);

    useEffect(() => {
        dispatch(cardsFetchAction())
    }, [dispatch]);
    // const requestCardsFetch = () => {
    //     dispatch(cardsFetchAction())
    // };

    return (
        <>
            <ToastContainer />
            <Cards
                cardsData={cardsData}
                isLoading={isLoadingCards}
                // fetchData={requestCardsFetch}
            />
        </>
    )

};

CardsContainer.propTypes = propTypes;
CardsContainer.defaultProps = defaultProps;

export default CardsContainer;