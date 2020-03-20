// Saga
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
// Actions
import {
    FETCH_CARDS_REQUESTED,
    BOOKMARK_CARD_REQUESTED,
    DELETE_CARD_REQUESTED,
    RESTORE_CARD_REQUESTED,
    cardsFetchSucceeded,
    cardsFetchFailed,
    cardBookmarkSucceeded,
    cardBookmarkFailed,
    cardDeleteSucceeded,
    cardDeleteFailed,
    cardRestoreSucceeded,
    cardRestoreFailed,
} from '../redux/actions/cards';
// Services
import CardsApiService from '../services/api/CardsApiService';
import NewsApiService from '../services/api/NewsApiService';


function _cardsCollectionRequest(page, topic) {
    return NewsApiService.fetchFeedTop({ page, category: topic })
    // return CardsApiService.fetchCards()
}

function _cardBookmarkRequest(cardId) {
    return CardsApiService.bookmarkCard(cardId)
    // return new Promise((resolve, reject) => {
    //     reject(new Error('oops! server cannot bookmark this card...'))
    // })
}

function _cardDeleteRequest(cardId) {
    return CardsApiService.deleteCard(cardId)
}

function _cardRestoreRequest(cardId) {
    return CardsApiService.restoreCard(cardId)
}

function* fetchCards(action) {
    try {
        const { page, topic } = action.payload;
        const cardsResponse = yield call(_cardsCollectionRequest, page, topic);
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

function* restoreCard(action) {
    try {
        const { cardId } = action.payload;
        yield call(_cardRestoreRequest, cardId);
        yield put(cardRestoreSucceeded(cardId))
    } catch (error) {
        yield put(cardRestoreFailed(action.payload.cardId, error))
    }
}

function* cardsSaga() {
    yield takeLatest(FETCH_CARDS_REQUESTED, fetchCards);
    yield takeEvery(BOOKMARK_CARD_REQUESTED, bookmarkCard);
    yield takeEvery(DELETE_CARD_REQUESTED, deleteCard);
    yield takeEvery(RESTORE_CARD_REQUESTED, restoreCard)
}

export default cardsSaga;
