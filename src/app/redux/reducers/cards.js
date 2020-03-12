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
// Services
import NormalizerService from '../../services/NormalizerService';

const initialState = {
    collection: [],
    bookmarkedCardIds: [],
    loading: false,
    bookmarkingOnCard: null,
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
                collection: NormalizerService.normalizeCards(action.payload.collection),
                loading: false,
                fetchError: null,
            };
        case FETCH_CARDS_FAILED:
            return {
                ...state,
                loading: false,
                fetchError: action.payload.error,
            };
        case BOOKMARK_CARD_REQUESTED:
            return {
                ...state,
                bookmarkingOnCard: action.payload.cardId,
            };
        case BOOKMARK_CARD_SUCCEEDED:
            return {
                ...state,
                bookmarkingOnCard: null,
                bookmarkedCardIds: xor(state.bookmarkedCardIds, [action.payload.cardId])
            };
        case BOOKMARK_CARD_FAILED:
            return {
                ...state,
                bookmarkingOnCard: null,
                bookmarkError: {
                    error: action.payload.error,
                    cardId: action.payload.cardId,
                },
            };
        default:
            return state;
    }
}