import store from 'app/store';
import {
  CONTENT_ADD_GRAPHICS,
  UPDATE_ATTRS,
  UPDATE_ATTRTYPES,
  UPDATE_X,
  UPDATE_Y,
  UPDATE_ITEM,
  UPDATE_ECHART_ITEM,
} from 'app/store/content/action';
import { KeyCreator, rem } from 'tools';
import { GRAPHIC_PREFIX } from 'constants';

const keyCreator = new KeyCreator();

export const size = {
  [GRAPHIC_PREFIX]: {
    height: rem(340),
    width: rem(510),
  },
};

const addGraphics = (items, dataConfigs, defaultTypes) => {
  store.dispatch({
    type: CONTENT_ADD_GRAPHICS,
    payload: {
      items,
      dataConfigs,
      defaultTypes,
      keys: items.map(() => keyCreator.create(20, GRAPHIC_PREFIX)),
    },
  });
};

const updateAttrs = (attrs) => {
  store.dispatch({
    type: UPDATE_ATTRS,
    payload: {
      attrs,
    },
  });
};

const updateAttrTypes = (attrTypes) => {
  store.dispatch({
    type: UPDATE_ATTRTYPES,
    payload: {
      attrTypes,
    },
  });
};

const updateX = (itemKey, xVal) => {
  store.dispatch({
    type: UPDATE_X,
    payload: {
      itemKey,
      xVal,
    },
  });
};

const updateY = (itemKey, yVal) => {
  store.dispatch({
    type: UPDATE_Y,
    payload: {
      itemKey,
      yVal,
    },
  });
};

const updateItem = (itemKey, item) => {
  store.dispatch({
    type: UPDATE_ITEM,
    payload: {
      itemKey,
      item,
    },
  });
};

const updateEchartsItem = (itemKey, item) => {
  store.dispatch({
    type: UPDATE_ECHART_ITEM,
    payload: {
      itemKey,
      item,
    },
  });
};

export default {
  addGraphics,
  updateAttrs,
  updateAttrTypes,
  updateX,
  updateY,
  updateItem,
  updateEchartsItem,
};
