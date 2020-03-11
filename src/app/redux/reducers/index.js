// Redux
import { combineReducers } from 'redux';

import cards from './cards';

const createRootReducer = combineReducers({
    cards,
});

export default createRootReducer;