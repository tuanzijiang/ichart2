import store from 'app/store';
import { USERINFO_LOGIN_CHANG } from 'app/store/userInfo/action';
import history from './history';

const logout = () => {
  store.dispatch({
    type: USERINFO_LOGIN_CHANG,
    payload: {
      isLogin: false,
    },
  });
  history.push('/login');
};

export default {
  logout,
};
