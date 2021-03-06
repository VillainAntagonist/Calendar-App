import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import reducers from "./reducers/reducers";
import {compose} from "redux";
const rootReducer =combineReducers(reducers)

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;