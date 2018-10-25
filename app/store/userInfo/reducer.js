import UserInfo from 'app/entities/UserInfo';
import {
  USERINFO_LOGIN_CHANG,
} from './action';

const reducer = (state = new UserInfo(), action) => {
  const { payload } = action;
  switch (action.type) {
    case USERINFO_LOGIN_CHANG:
      return {
        ...state,
        isLogin: payload.isLogin,
      };
    default:
      return state;
  }
};

export default reducer;
