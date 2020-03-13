import { includes, values, isEmpty } from 'lodash';
import { createSelector } from 'reselect';


const cardsCollectionSelector = (state) => state.cards.collection;

export const cardsAsArray = createSelector(
    cardsCollectionSelector,
    (cardsCollection) => {
        return isEmpty(cardsCollection) ? [] : values(cardsCollection)
    }
);

export const isCardBookmarked = createSelector(
    (state, cardId) => state.cards,
    (_, cardId) => cardId,
    (cardsState = [], cardId = null) => {
        return includes(cardsState.bookmarkedCardIds, cardId)
    }
);

export const isCardProcessing = createSelector(
    (state, cardId) => state.cards,
    (_, cardId) => cardId,
    (cardsState = [], cardId = null) => {
        return includes(cardsState.processingCardIds, cardId)
    }
);
