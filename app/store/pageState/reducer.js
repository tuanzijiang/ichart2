import PageState from 'app/entities/PageState';
import {
  WORKSPACE_PAGE_CHANGE,
  WORKSPACE_SIDEBAR_AREA_CHANGE,
  WORKSPACE_SIDEBAR_IDX_CHANGE,
  WORKSPACE_SIDEBAR_IDX_AREA,
  WORKSPACE_SIDEPAGE_CHANGE,
  WORKSPACE_SIDEPAGE_NAME,
  WORKSPACE_CURRENT_ITEM_KEY,
  WORKSPACE_SIDEMENU_PAGEIDX,
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
    case WORKSPACE_SIDEPAGE_CHANGE:
      return {
        ...state,
        sidePage: payload.areaState,
      };
    case WORKSPACE_SIDEPAGE_NAME:
      return {
        ...state,
        sidePage: payload.areaState,
        sidePageName: payload.name,
      };
    case WORKSPACE_CURRENT_ITEM_KEY:
      return {
        ...state,
        currItemKey: payload.key,
      };
    case WORKSPACE_SIDEMENU_PAGEIDX:
      return {
        ...state,
        sideMenuPageIdx: payload.pageIdx,
      };
    default:
      return state;
  }
};

export default reducer;
