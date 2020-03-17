export const FETCH_CARDS_REQUESTED = 'cards/FETCH_CARDS_REQUESTED';
export const FETCH_CARDS_SUCCEEDED = 'cards/FETCH_CARDS_SUCCEEDED';
export const FETCH_CARDS_FAILED = 'cards/FETCH_CARDS_FAILED';

export const BOOKMARK_CARD_REQUESTED = 'cards/BOOKMARK_CARD_REQUESTED';
export const BOOKMARK_CARD_SUCCEEDED = 'cards/BOOKMARK_CARD_SUCCEEDED';
export const BOOKMARK_CARD_FAILED = 'cards/BOOKMARK_CARD_FAILED';

export const DELETE_CARD_REQUESTED = 'cards/DELETE_CARD_REQUESTED';
export const DELETE_CARD_SUCCEEDED = 'cards/DELETE_CARD_SUCCEEDED';
export const DELETE_CARD_FAILED = 'cards/DELETE_CARD_FAILED';

export const RESTORE_CARD_REQUESTED = 'cards/RESTORE_CARD_REQUESTED';
export const RESTORE_CARD_SUCCEEDED = 'cards/RESTORE_CARD_SUCCEEDED';
export const RESTORE_CARD_FAILED = 'cards/RESTORE_CARD_FAILED';


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
        error: error.message,
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
        error: error.message,
    },
    error: true,
});

export const cardDeleteRequested = (cardId = null) => ({
    type: DELETE_CARD_REQUESTED,
    payload: {
        cardId,
    }
});

export const cardDeleteSucceeded = (cardId = null) => ({
    type: DELETE_CARD_SUCCEEDED,
    payload: {
        cardId,
    }
});

export const cardDeleteFailed = (cardId, error) => ({
    type: BOOKMARK_CARD_FAILED,
    payload: {
        cardId,
        error: error.message
    },
    error: true,
});

export const cardRestoreRequested = (cardId = null) => ({
    type: RESTORE_CARD_REQUESTED,
    payload: {
        cardId,
    }
});

export const cardRestoreSucceeded = (cardId = null) => ({
    type: RESTORE_CARD_SUCCEEDED,
    payload: {
        cardId,
    }
});

export const cardRestoreFailed = (cardId, error) => ({
    type: RESTORE_CARD_FAILED,
    payload: {
        cardId,
        error: error.message,
    },
    error: true,
});