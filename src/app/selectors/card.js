import { includes } from 'lodash';
import { createSelector } from 'reselect';

const cardSelector = (state, cardId) => state.cards;

export const isCardBookmarkedSelector = createSelector(
    cardSelector,
    (_, cardId) => cardId,
    (cardsState = [], cardId = null) => {
        return includes(cardsState.bookmarkedCardIds, cardId)
    }
);
