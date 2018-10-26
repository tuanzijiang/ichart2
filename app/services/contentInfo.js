import store from 'app/store';
import { CONTENT_ADD_GRAPHICS } from 'app/store/content/action';

const addGraphics = (item) => {
  store.dispatch({
    type: CONTENT_ADD_GRAPHICS,
    payload: {
      item,
    },
  });
};

export default {
  addGraphics,
};
