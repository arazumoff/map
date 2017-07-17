import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './app/containers/App';

import registerServiceWorker from './registerServiceWorker';

import configureStore from './app/store/configureStore'
import rootSaga from './app/sagas'

const store = configureStore(window.__INITIAL_STATE__)
store.runSaga(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
