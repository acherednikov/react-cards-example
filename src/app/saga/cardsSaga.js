// Saga
import { call, put, takeLatest } from 'redux-saga/effects';
// Actions
import {
    FETCH_CARDS_REQUESTED,
    BOOKMARK_CARD_REQUESTED,
    cardsFetchSucceeded,
    cardsFetchFailed,
    cardBookmarkSucceeded,
    cardBookmarkFailed,
} from '../redux/actions/cards';
// Services
import CardsApiService from '../services/api/CardsApiService';


function _cardsCollectionRequest(queryOptions = {}) {
    return CardsApiService.fetchCards()
        .then(response => {
            return response
        })
        .catch(error => {
            throw error
        })
}

function _cardBookmarkRequest(cardId) {
    return CardsApiService.bookmarkCard(cardId)
        .then(response => {
            return response
        })
        .catch(error => {
            throw error
        })
}

function* fetchCards(action) {
    try {
        const { queryOptions } = action.payload;
        const cardsResponse = yield call(_cardsCollectionRequest, queryOptions);
        yield put(cardsFetchSucceeded(cardsResponse.data))
    } catch (error) {
        yield put(cardsFetchFailed(error))
    } finally {
    }
}

function* bookmarkCard(action) {
    try {
        const { cardId } = action.payload;
        yield call(_cardBookmarkRequest, cardId);
        yield put(cardBookmarkSucceeded(cardId))
    } catch (error) {
        yield put(cardBookmarkFailed(error))
    } finally {
    }
}

function* cardsSaga() {
    yield takeLatest(FETCH_CARDS_REQUESTED, fetchCards);
    yield takeLatest(BOOKMARK_CARD_REQUESTED, bookmarkCard)
}

export default cardsSaga;
