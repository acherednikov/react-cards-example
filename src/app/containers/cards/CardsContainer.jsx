// React Core
import React, { useEffect, useRef } from 'react';
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
import useQueryParam from '../../hooks/useQueryParam';
// Libs
import get from 'lodash/get';
// Libs
import { ToastContainer } from 'react-toastify';
// Components
import NavigationBar from '../../components/navigation/NavigationBar';
import Cards from '../../components/cards/Cards';
// Config
import {
    DEFAULT_TOPIC,
    DEFAULT_COUNTRY,
    DEFAULT_LANGUAGE,
    DEFAULT_SORT,
} from '../../config/Conent';


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

    const isInitialMount = useRef(true);

    const match = get(useRouteMatch("/:match"), 'params.match', null);

    //TODO how to set default params in search/?
    const topic = useQueryParam('topic', DEFAULT_TOPIC.value);
    const country = useQueryParam('country', DEFAULT_COUNTRY.value);
    const searchQuery = useQueryParam('query', '');
    const language = useQueryParam('language', DEFAULT_LANGUAGE.value);
    const sort = useQueryParam('sort', DEFAULT_SORT.value);
    const from = useQueryParam('from', null);
    const to = useQueryParam('to', null);

    const cardsData = useSelector(state => cardsAsArraySelector(state, match));
    const fetchError = useSelector(state => state.cards.fetchError);
    const totalResults = useSelector(state => state.cards.total);
    const isLoadingCards = useSelector(state => state.cards.isFetching);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log('! cards force fetch (EFFECT)')
            requestCardsFetch(1, true);
        }
        return () => {}
    }, [country, topic, searchQuery, language, sort, from, to]);

    const buildQueryOptions = () => {
        let queryOptions = { };

        if (match === null || match === 'featured') {
            queryOptions = { ...queryOptions, ...{ type: 'featured', topic, country } }
        }
        if (match === 'search') {
            queryOptions = { 
                ...queryOptions, ...{ type: 'search', query: searchQuery, language, sort, from, to }
            }
        }

        return queryOptions
    };

    const requestCardsFetch = (page, refresh = false) => {
        if (totalResults !== null && totalResults === cardsData.length && !refresh) return;

        const queryOptions = buildQueryOptions();
        dispatch(cardsFetchAction({ page, queryOptions, performRefresh: refresh }))
    };

    return (
        <div className="uk-flex uk-flex-column">
            <NavigationBar />
            <ToastContainer />
            <Cards
                cardsData={cardsData}
                fetchError={fetchError}
                isLoading={isLoadingCards}
                totalResults={totalResults}
                fetchData={requestCardsFetch}
            />
        </div>
    )

};

CardsContainer.propTypes = propTypes;
CardsContainer.defaultProps = defaultProps;

export default CardsContainer;