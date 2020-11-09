import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Containers/Root/root';
import rootReducer from './store/rootReducer';
import thunk from 'redux-thunk';
import {createStore,compose,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
        <Provider store={store}>
            <Root/>
        </Provider>
,document.getElementById('root'));