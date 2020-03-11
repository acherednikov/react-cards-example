export const FETCH_CARDS_REQUESTED = 'cards/FETCH_CARDS_REQUESTED';
export const FETCH_CARDS_SUCCEEDED = 'cards/FETCH_CARDS_SUCCEEDED';
export const FETCH_CARDS_FAILED = 'cards/FETCH_CARDS_FAILED';


export const cardsFetchRequested = (queryOptions = {}) => ({
    type: FETCH_CARDS_REQUESTED,
    payload: {
        queryOptions,
    }
});

export const cardsFetchSucceeded = (collection) => ({
    type: FETCH_CARDS_SUCCEEDED,
    payload: {
        collection,
    }
});

export const cardsFetchFailed = (error) => ({
    type: FETCH_CARDS_FAILED,
    payload: {
        error: error.message
    },
    error: true,
});