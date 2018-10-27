import ContentInfo from 'app/entities/ContentInfo';
import {
  CONTENT_ADD_GRAPHICS,
} from './action';

const reducer = (state = new ContentInfo(), action) => {
  const { payload } = action;
  switch (action.type) {
    case CONTENT_ADD_GRAPHICS:
      return {
        ...state,
        items: {
          ...state.items,
          ...payload.keys.reduce((pre, cur, idx) => ({
            ...pre,
            [cur]: payload.items[idx],
          }), {}),
        },
        keys: state.keys.concat(payload.keys),
      };
    default:
      return state;
  }
};

export default reducer;
