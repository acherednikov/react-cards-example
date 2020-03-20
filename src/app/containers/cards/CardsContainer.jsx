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
// Hooks
import useTopic from '../../hooks/useTopic';
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

    const topic = useTopic();
    console.log('=> CardsContainer topic', topic)
    const cardsData = useSelector(state => cardsAsArraySelector(state, match));
    const totalResults = useSelector(state => state.cards.total);
    const isLoadingCards = useSelector(state => state.cards.isFetching);

    useEffect(() => {
        requestCardsFetch(1, true);
        return () => {}
    }, [topic]);

    const requestCardsFetch = (page, refresh = false) => {
        if (totalResults !== null && totalResults === cardsData.length) return;
        dispatch(cardsFetchAction({ page, topic, performRefresh: refresh }))
    };

    return (
        <>
            <ToastContainer />
            <Cards
                cardsData={cardsData}
                isLoading={isLoadingCards}
                fetchData={requestCardsFetch}
            />
        </>
    )

};

CardsContainer.propTypes = propTypes;
CardsContainer.defaultProps = defaultProps;

export default CardsContainer;