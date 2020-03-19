import { includes, filter } from 'lodash';
import { createSelector } from 'reselect';
import CardsUtils from '../services/CardsUtils';


export const cardsAsArray = createSelector(
    (state, cardFilter) => state.cards,
    (_, cardFilter) => cardFilter,
    (cardsState = {}, cardFilter = null) => {
        let collection = cardsState.collection;

        switch (cardFilter) {
            case 'bookmarks':
                collection = CardsUtils.collectionFilteredByIds(collection, cardsState.bookmarkedCardIds);
                break;
            case 'trash':
                collection = CardsUtils.collectionFilteredByIds(collection, cardsState.deletedCardIds);
                break;
            default:
                collection = CardsUtils.collectionFilteredByIds(collection, cardsState.deletedCardIds, true);
                break;
        }
        return collection
    }
);

export const isCardProcessing = createSelector(
    (state, cardId) => state.cards,
    (_, cardId) => cardId,
    (cardsState = {}, cardId = null) => {
        return includes(cardsState.processingCardIds, cardId)
    }
);

export const isCardBookmarked = createSelector(
    (state, cardId) => state.cards,
    (_, cardId) => cardId,
    (cardsState = {}, cardId = null) => {
        return includes(cardsState.bookmarkedCardIds, cardId)
    }
);

export const isCardDeleted = createSelector(
    (state, cardId) => state.cards,
    (_, cardId) => cardId,
    (cardsState = {}, cardId = null) => {
        return includes(cardsState.deletedCardIds, cardId)
    }
);

export const cardActionErrors = createSelector(
    (state, cardId) => state.cards,
    (_, cardId) => cardId,
    (cardsState = {}, cardId = null) => {
        return filter(cardsState.cardErrors, { cardId })
    }
);