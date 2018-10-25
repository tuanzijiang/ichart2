export const USERINFO_LOGIN_CHANG = Symbol('USERINFO_LOGIN_CHANGE');

export const changeLoginState = isLogin => ({
  type: USERINFO_LOGIN_CHANG,
  payload: {
    isLogin,
  },
});
