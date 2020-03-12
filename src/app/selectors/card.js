import { includes, values } from 'lodash';
import { createSelector } from 'reselect';

const cardsCollectionSelector = (state) => state.cards.collection;

export const cardsAsArraySelector = createSelector(
    cardsCollectionSelector,
    (cardsState) => {
        return values(cardsState)
    }
);

export const isCardBookmarkedSelector = createSelector(
    (state, cardId) => state.cards,
    (_, cardId) => cardId,
    (cardsState = [], cardId = null) => {
        return includes(cardsState.bookmarkedCardIds, cardId)
    }
);
