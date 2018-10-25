import { createStore, combineReducers } from 'redux';
import userInfoReducer from './userInfo/reducer';

const reducer = combineReducers({
  userInfo: userInfoReducer,
});

const store = createStore(reducer);

export default store;
