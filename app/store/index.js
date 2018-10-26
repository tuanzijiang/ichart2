import { createStore, combineReducers } from 'redux';
import userInfoReducer from './userInfo/reducer';
import pageStateReducer from './pageState/reducer';
import contentReducer from './content/reducer';

const reducer = combineReducers({
  userInfo: userInfoReducer,
  pageState: pageStateReducer,
  content: contentReducer,
});

const store = createStore(reducer);

window.ICHART_STORE = store;

export default store;
