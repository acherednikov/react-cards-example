// Saga
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
// Actions
import {
    FETCH_CARDS_REQUESTED,
    BOOKMARK_CARD_REQUESTED,
    DELETE_CARD_REQUESTED,
    cardsFetchSucceeded,
    cardsFetchFailed,
    cardBookmarkSucceeded,
    cardBookmarkFailed,
    cardDeleteSucceeded,
    cardDeleteFailed,
} from '../redux/actions/cards';
// Services
import CardsApiService from '../services/api/CardsApiService';


function _cardsCollectionRequest(queryOptions = {}) {
    return CardsApiService.fetchCards(queryOptions)
}

function _cardBookmarkRequest(cardId) {
    return CardsApiService.bookmarkCard(cardId)
}

function _cardDeleteRequest(cardId) {
    return CardsApiService.deleteCard(cardId)
}

function* fetchCards(action) {
    try {
        const { queryOptions } = action.payload;
        const cardsResponse = yield call(_cardsCollectionRequest, queryOptions);
        yield put(cardsFetchSucceeded(cardsResponse.data))
    } catch (error) {
        yield put(cardsFetchFailed(error))
    }
}

function* bookmarkCard(action) {
    try {
        const { cardId } = action.payload;
        yield call(_cardBookmarkRequest, cardId);
        yield put(cardBookmarkSucceeded(cardId))
    } catch (error) {
        yield put(cardBookmarkFailed(action.payload.cardId, error))
    }
}

function* deleteCard(action) {
    try {
        const { cardId } = action.payload;
        yield call(_cardDeleteRequest, cardId);
        yield put(cardDeleteSucceeded(cardId))
    } catch (error) {
        yield put(cardDeleteFailed(action.payload.cardId, error))
    }
}

function* cardsSaga() {
    yield takeLatest(FETCH_CARDS_REQUESTED, fetchCards);
    yield takeEvery(BOOKMARK_CARD_REQUESTED, bookmarkCard);
    yield takeEvery(DELETE_CARD_REQUESTED, deleteCard)
}

export default cardsSaga;
