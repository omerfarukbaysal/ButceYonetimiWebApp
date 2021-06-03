import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import setAuthToken from '../utils/setAuthToken';

/*import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'*/

/* const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer) */

const middleware = [thunk];

/*const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);*/


/*export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
    let currentState = store.getState();
    store.subscribe(() => {
        // keep track of the previous and current state to compare changes
        let previousState = currentState;
        currentState = store.getState();
        // if the token changes set the value in localStorage and axios headers
        if (previousState.auth.token !== currentState.auth.token) {
            const token = currentState.auth.token;
            setAuthToken(token);
        }
    });
    let persistor = persistStore(store)
    return { store, persistor }
}*/

/*export default createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);*/
const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
    // keep track of the previous and current state to compare changes
    let previousState = currentState;
    currentState = store.getState();
    // if the token changes set the value in localStorage and axios headers
    if (previousState.authReducer.token !== currentState.authReducer.token) {
        const token = currentState.authReducer.token;
        setAuthToken(token);
    }
});
export default store;