import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import authReducer from '../reducers/authReducer';
//import userReducer from '../reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer } from "redux-persist";
import { fetchUser } from '../api/authApi';

export const config = {
    key: 'root',
    storage: storage,
    blacklist: ['extras']
};

const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(
    combineReducers({
        auth: persistReducer(config, authReducer),
        //user: userReducer
    })
    , composeEnhancer);

export default store;