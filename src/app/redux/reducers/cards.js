// Libs
import { concat, pull, xor } from 'lodash';
// Actions
import {
    FETCH_CARDS_REQUESTED,
    FETCH_CARDS_SUCCEEDED,
    FETCH_CARDS_FAILED,
    BOOKMARK_CARD_REQUESTED,
    BOOKMARK_CARD_SUCCEEDED,
    BOOKMARK_CARD_FAILED,
    DELETE_CARD_REQUESTED,
    DELETE_CARD_SUCCEEDED,
    DELETE_CARD_FAILED,
} from '../actions/cards';
// Services
import NormalizerService from '../../services/NormalizerService';


const initialState = {
    collection: {},
    loading: false,
    bookmarkedCardIds: [],
    deletedCardIds: [], //trashcan
    processingCardIds: [],
    fetchError: {},
    bookmarkError: {},
    deleteError: {},
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
                processingCardIds: concat(state.processingCardIds, action.payload.cardId),
            };
        case BOOKMARK_CARD_SUCCEEDED:
            return {
                ...state,
                processingCardIds: pull(state.processingCardIds, action.payload.cardId),
                bookmarkedCardIds: xor(state.bookmarkedCardIds, [action.payload.cardId])
            };
        case BOOKMARK_CARD_FAILED:
            return {
                ...state,
                processingCardIds: pull(state.processingCardIds, action.payload.cardId),
                bookmarkError: {
                    message: action.payload.error,
                    cardId: action.payload.cardId,
                },
            };
        case DELETE_CARD_REQUESTED:
            return {
                ...state,
                processingCardIds: concat(state.processingCardIds, action.payload.cardId),
            };
        case DELETE_CARD_SUCCEEDED:
            return {
                ...state,
                processingCardIds: pull(state.processingCardIds, action.payload.cardId),
                deletedCardIds: xor(state.deletedCardIds, [action.payload.cardId])
            };
        case DELETE_CARD_FAILED:
            return {
                ...state,
                processingCardIds: pull(state.processingCardIds, action.payload.cardId),
                deleteError: {
                    message: action.payload.error,
                    cardId: action.payload.cardId,
                },
            };
        default:
            return state;
    }
}