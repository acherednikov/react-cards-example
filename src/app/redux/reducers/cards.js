// Libs
import xor from 'lodash/xor';
// Actions
import {
    FETCH_CARDS_REQUESTED,
    FETCH_CARDS_SUCCEEDED,
    FETCH_CARDS_FAILED,
    BOOKMARK_CARD_REQUESTED,
    BOOKMARK_CARD_SUCCEEDED,
    BOOKMARK_CARD_FAILED,
} from '../actions/cards';

const initialState = {
    collection: [],
    bookmarkedCardIds: [],
    loading: false,
    fetchError: null,
    bookmarkError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CARDS_REQUESTED:
            return {
                ...state,
                loading: true,
                fetchError: null,
            };
        case FETCH_CARDS_SUCCEEDED:
            return {
                ...state,
                collection: action.payload.collection,
                loading: false,
                fetchError: null,
            };
        case FETCH_CARDS_FAILED:
            return {
                ...state,
                loading: false,
                fetchError: action.payload.error,
            };
        // case BOOKMARK_CARD_SUCCEEDED:
        case BOOKMARK_CARD_REQUESTED:
            console.log('-> BOOKMARK_CARD_SUCCEEDED', xor(state.bookmarkedCardIds, [action.payload.cardId]))
            return {
                ...state,
                bookmarkedCardIds: xor(state.bookmarkedCardIds, [action.payload.cardId])
            };
        default:
            return state;
    }
}