import ContentInfo from 'app/entities/ContentInfo';
import {
  CONTENT_ADD_GRAPHICS,
  UPDATE_ATTRS,
  UPDATE_X,
  UPDATE_Y,
  UPDATE_ITEM,
  UPDATE_ECHART_ITEM,
  UPDATE_ATTRTYPES,
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
        dataConfigs: {
          ...state.dataConfigs,
          ...payload.keys.reduce((pre, cur, idx) => ({
            ...pre,
            [cur]: payload.dataConfigs[idx],
          }), {}),
          items: {
            ...(state.dataConfigs || {}).items,
            ...payload.keys.reduce((pre, cur, idx) => ({
              ...pre,
              [cur]: {
                defaultType: payload.defaultTypes[idx],
              },
            }), {}),
          },
        },
      };
    case UPDATE_ATTRS:
      return {
        ...state,
        attrs: payload.attrs,
      };
    case UPDATE_X:
      return {
        ...state,
        dataConfigs: {
          ...state.dataConfigs,
          [payload.itemKey]: {
            ...state.dataConfigs[payload.itemKey],
            x: payload.xVal,
          },
        },
      };
    case UPDATE_Y:
      return {
        ...state,
        dataConfigs: {
          ...state.dataConfigs,
          [payload.itemKey]: {
            ...state.dataConfigs[payload.itemKey],
            y: payload.yVal,
          },
        },
      };
    case UPDATE_ITEM:
      return {
        ...state,
        dataConfigs: {
          ...state.dataConfigs,
          items: {
            [payload.itemKey]: {
              ...state.dataConfigs[payload.itemKey],
              ...payload.item,
            },
          },
        },
      };
    case UPDATE_ECHART_ITEM:
      return {
        ...state,
        items: {
          [payload.itemKey]: {
            ...state.items[payload.itemKey],
            ...payload.item,
          },
        },
      };
    case UPDATE_ATTRTYPES:
      return {
        ...state,
        attrTypes: payload.attrTypes,
      };
    default:
      return state;
  }
};

export default reducer;
