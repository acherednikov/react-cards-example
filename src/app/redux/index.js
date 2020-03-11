// Redux
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// Reducer
import rootReducer from './reducers';
// Saga
import sagaMiddleware from './saga';
import rootSaga from '../saga/rootSaga';

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;
