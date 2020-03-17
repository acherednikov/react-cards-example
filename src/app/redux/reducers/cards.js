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
} from '../actions/cards';
// Services
import CardsUtils from '../../services/CardsUtils';


const initialState = {
    collection: {},
    loading: false,
    bookmarkedCardIds: [],
    deletedCardIds: [], //trashcan
    processingCardIds: [],
    fetchError: {},
    bookmarkError: {},
    deleteError: {},
    restoreError: {},
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
                // collection: CardsUtils.collectionNormalized(action.payload.collection),
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
                bookmarkError: {
                    message: action.payload.error,
                    cardId: action.payload.cardId,
                },
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
                deleteError: {
                    message: action.payload.error,
                    cardId: action.payload.cardId,
                },
            };
        case RESTORE_CARD_REQUESTED:
            return {
                ...state,
                processingCardIds: CardsUtils.idConcat(state.processingCardIds, action.payload.cardId),
            };
        case RESTORE_CARD_SUCCEEDED:
            return {
                ...state,
                deletedCardIds: CardsUtils.idRemove(state.deletedCardIds, action.payload.cardId),
            };
        case RESTORE_CARD_FAILED:
            return {
                ...state,
                restoreError: {
                    message: action.payload.error,
                    cardId: action.payload.cardId,
                },
            };
        default:
            return state;
    }
}