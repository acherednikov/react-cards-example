import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/redux'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import * as serviceWorker from './serviceWorker';
import CardsContainer from './app/containers/cards/CardsContainer';

UIkit.use(Icons);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <CardsContainer />
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
