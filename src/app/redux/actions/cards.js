export const FETCH_CARDS_REQUESTED = 'cards/FETCH_CARDS_REQUESTED';
export const FETCH_CARDS_SUCCEEDED = 'cards/FETCH_CARDS_SUCCEEDED';
export const FETCH_CARDS_FAILED = 'cards/FETCH_CARDS_FAILED';

export const BOOKMARK_CARD_REQUESTED = 'cards/BOOKMARK_CARD_REQUESTED';
export const BOOKMARK_CARD_SUCCEEDED = 'cards/BOOKMARK_CARD_SUCCEEDED';
export const BOOKMARK_CARD_FAILED = 'cards/BOOKMARK_CARD_FAILED';


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

export const cardBookmarkRequested = (cardId = null) => ({
    type: BOOKMARK_CARD_REQUESTED,
    payload: {
        cardId,
    }
});

export const cardBookmarkSucceeded = (cardId = null) => ({
    type: BOOKMARK_CARD_SUCCEEDED,
    payload: {
        cardId,
    }
});

export const cardBookmarkFailed = (cardId, error) => ({
    type: BOOKMARK_CARD_FAILED,
    payload: {
        cardId,
        error: error.message
    },
    error: true,
});