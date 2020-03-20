import { filter } from 'lodash';
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
    RESTORE_CARD_REQUESTED,
    RESTORE_CARD_SUCCEEDED,
    RESTORE_CARD_FAILED,
    PURGE_CARD_ERROR,
} from '../actions/cards';
// Services
import CardsUtils from '../../services/CardsUtils';


const initialState = {
    collection: {},
    total: 0,
    isFetching: true,
    bookmarkedCardIds: [],
    deletedCardIds: [], //trashcan
    processingCardIds: [],
    fetchError: {},
    cardErrors: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CARDS_REQUESTED:
            return {
                ...state,
                isFetching: true,
                fetchError: null,
            };
        case FETCH_CARDS_SUCCEEDED:
            return {
                ...state,
                // collection: CardsUtils.collectionNormalized(action.payload.collection),
                collection: action.payload.articles,
                total: action.payload.totalResults,
                isFetching: false,
                fetchError: null,
            };
        case FETCH_CARDS_FAILED:
            return {
                ...state,
                isFetching: false,
                fetchError: action.payload.error,
            };
        case BOOKMARK_CARD_REQUESTED:
            return {
                ...state,
                processingCardIds: CardsUtils.idConcat(state.processingCardIds, action.payload.cardId),
            };
        case BOOKMARK_CARD_SUCCEEDED:
            return {
                ...state,
                processingCardIds: CardsUtils.idRemove(state.processingCardIds, action.payload.cardId),
                bookmarkedCardIds: CardsUtils.idToggle(state.bookmarkedCardIds, action.payload.cardId),
            };
        case BOOKMARK_CARD_FAILED:
            return {
                ...state,
                processingCardIds: CardsUtils.idRemove(state.processingCardIds, action.payload.cardId),
                cardErrors: [...state.cardErrors, {
                    error: action.payload.error,
                    action: 'bookmark',
                    cardId: action.payload.cardId,
                }],
            };
        case DELETE_CARD_REQUESTED:
            return {
                ...state,
                processingCardIds: CardsUtils.idConcat(state.processingCardIds, action.payload.cardId),
            };
        case DELETE_CARD_SUCCEEDED:
            return {
                ...state,
                processingCardIds: CardsUtils.idRemove(state.processingCardIds, action.payload.cardId),
                deletedCardIds: CardsUtils.idToggle(state.deletedCardIds, action.payload.cardId),
            };
        case DELETE_CARD_FAILED:
            return {
                ...state,
                processingCardIds: CardsUtils.idRemove(state.processingCardIds, action.payload.cardId),
                cardErrors: [...state.cardErrors, {
                    error: action.payload.error,
                    action: 'delete',
                    cardId: action.payload.cardId,
                }],
            };
        case RESTORE_CARD_REQUESTED:
            return {
                ...state,
                processingCardIds: CardsUtils.idConcat(state.processingCardIds, action.payload.cardId),
            };
        case RESTORE_CARD_SUCCEEDED:
            return {
                ...state,
                processingCardIds: CardsUtils.idRemove(state.processingCardIds, action.payload.cardId),
                deletedCardIds: CardsUtils.idRemove(state.deletedCardIds, action.payload.cardId),
            };
        case RESTORE_CARD_FAILED:
            return {
                ...state,
                processingCardIds: CardsUtils.idRemove(state.processingCardIds, action.payload.cardId),
                cardErrors: [...state.cardErrors, {
                    error: action.payload.error,
                    action: 'restore',
                    cardId: action.payload.cardId,
                }],
            };
        case PURGE_CARD_ERROR:
            return {
                ...state,
                cardErrors: filter(state.cardErrors, { id: !action.payload.cardId })
            };
        default:
            return state;
    }
}