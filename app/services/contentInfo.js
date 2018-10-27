import store from 'app/store';
import { CONTENT_ADD_GRAPHICS } from 'app/store/content/action';
import { KeyCreator, rem } from 'tools';

const keyCreator = new KeyCreator();

export const GRAPHIC_PREFIX = 'graphic_';

export const size = {
  [GRAPHIC_PREFIX]: {
    height: rem(340),
    width: rem(510),
  },
};

const addGraphics = (items) => {
  store.dispatch({
    type: CONTENT_ADD_GRAPHICS,
    payload: {
      items,
      keys: items.map(() => keyCreator.create(20, GRAPHIC_PREFIX)),
    },
  });
};

export default {
  addGraphics,
};
