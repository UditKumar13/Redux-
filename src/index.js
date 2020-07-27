import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
    ctr:counterReducer,
    res:resultReducer

});

const logger = store =>{
    return next=>{
        return action=>{
            console.log('[MiddleWare]Dispatching',action);

            const result = next(action);
            console.log('[MiddleWare]next state',store.getState());
            return result;
        }
    }
}
const store = createStore(rootReducer,applyMiddleware(logger));



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
