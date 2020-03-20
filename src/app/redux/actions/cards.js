import { createAction } from 'redux-actions';

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

export const PURGE_CARD_ERROR = 'cards/PURGE_CARD_ERROR';


export const cardsFetchRequested = createAction(FETCH_CARDS_REQUESTED, ({ page, topic, performRefresh }) => ({ page, topic, performRefresh }));
// export const cardsFetchSucceeded = createAction(FETCH_CARDS_SUCCEEDED, (collection = []) => ({ collection }));
export const cardsFetchSucceeded = createAction(FETCH_CARDS_SUCCEEDED, ({ articles, totalResults }) => ({ articles, totalResults }));
export const cardsFetchFailed = createAction(
    FETCH_CARDS_FAILED,
    (error = new Error()) => ({ error }),
);

export const cardBookmarkRequested = createAction(BOOKMARK_CARD_REQUESTED, cardId => ({ cardId }));
export const cardBookmarkSucceeded = createAction(BOOKMARK_CARD_SUCCEEDED, cardId => ({ cardId }));
export const cardBookmarkFailed = createAction(
    BOOKMARK_CARD_FAILED,
    (cardId = null, error = new Error()) => ({ cardId, error }),
);

export const cardDeleteRequested = createAction(DELETE_CARD_REQUESTED, cardId => ({ cardId }));
export const cardDeleteSucceeded = createAction(DELETE_CARD_SUCCEEDED, cardId => ({ cardId }));
export const cardDeleteFailed = createAction(
    DELETE_CARD_FAILED,
    (cardId = null, error = new Error()) => ({ cardId, error }),
);

export const cardRestoreRequested = createAction(RESTORE_CARD_REQUESTED, cardId => ({ cardId }));
export const cardRestoreSucceeded = createAction(RESTORE_CARD_SUCCEEDED, cardId => ({ cardId }));
export const cardRestoreFailed = createAction(
    RESTORE_CARD_FAILED,
    (cardId = null, error = new Error()) => ({ cardId, error }),
);

export const purgeCardError = createAction(PURGE_CARD_ERROR, cardId => ({ cardId }));
