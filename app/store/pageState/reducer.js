import PageState from 'app/entities/PageState';
import {
  WORKSPACE_PAGE_CHANGE,
  WORKSPACE_SIDEBAR_AREA_CHANGE,
  WORKSPACE_SIDEBAR_IDX_CHANGE,
  WORKSPACE_SIDEBAR_IDX_AREA,
} from './action';

const reducer = (state = new PageState(), action) => {
  const { payload } = action;
  switch (action.type) {
    case WORKSPACE_PAGE_CHANGE:
      return {
        ...state,
        workspacePage: payload.pageIdx,
      };
    case WORKSPACE_SIDEBAR_AREA_CHANGE:
      return {
        ...state,
        sideArea: payload.areaState,
      };
    case WORKSPACE_SIDEBAR_IDX_CHANGE:
      return {
        ...state,
        sideBarPage: payload.pageIdx,
      };
    case WORKSPACE_SIDEBAR_IDX_AREA:
      return {
        ...state,
        sideBarPage: payload.pageIdx,
        sideArea: payload.areaState,
      };
    default:
      return state;
  }
};

export default reducer;
