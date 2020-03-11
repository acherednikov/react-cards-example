// Saga
import { call, put, takeLatest } from 'redux-saga/effects';
// Actions
import {
    FETCH_CARDS_REQUESTED,
    cardsFetchSucceeded,
    cardsFetchFailed,
} from '../redux/actions/cards';
// Services
import CardsApiService from '../services/api/CardsApiService';


function _cardsRequest(queryOptions = {}) {
    return CardsApiService.fetchCards()
}

function* fetchCards(action) {
    try {
        const { queryOptions } = action.payload;
        const cardsResponse = yield call(_cardsRequest, queryOptions);
        yield put(cardsFetchSucceeded(cardsResponse.data))
    } catch (error) {
        yield put(cardsFetchFailed(error))
    } finally {
    }
}

function* cardsSaga() {
    yield takeLatest(FETCH_CARDS_REQUESTED, fetchCards)
}

export default cardsSaga;
