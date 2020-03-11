import {
    FETCH_CARDS_REQUESTED,
    FETCH_CARDS_SUCCEEDED,
    FETCH_CARDS_FAILED,
} from '../actions/cards';

const initialState = {
    collection: [],
    loading: false,
    fetchError: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CARDS_REQUESTED:
            return {
                ...state,
                loading:      true,
                fetchError:   null,
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
        default:
            return state;
    }
}