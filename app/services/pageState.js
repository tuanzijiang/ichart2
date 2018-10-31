import store from 'app/store';
import {
  WORKSPACE_PAGE_CHANGE,
  WORKSPACE_SIDEBAR_AREA_CHANGE,
  WORKSPACE_SIDEBAR_IDX_AREA,
  WORKSPACE_SIDEPAGE_CHANGE,
  WORKSPACE_SIDEPAGE_NAME,
  WORKSPACE_CURRENT_ITEM_KEY,
  WORKSPACE_SIDEMENU_PAGEIDX,
  WORKSPACE_UPDATE_DRAGINFO,
} from 'app/store/pageState/action';

export const DRAG_POSITION = [
  '',
  'ALL_ATTRS',
  'X_ATTRS',
  'Y_ATTRS',
];

const workspacePageChange = (pageIdx) => {
  store.dispatch({
    type: WORKSPACE_PAGE_CHANGE,
    payload: {
      pageIdx,
    },
  });
};

const workspaceSideBarArea = (areaState) => {
  store.dispatch({
    type: WORKSPACE_SIDEBAR_AREA_CHANGE,
    payload: {
      areaState,
    },
  });
};

const workspaceSideBarIdxAndArea = (areaState, pageIdx) => {
  store.dispatch({
    type: WORKSPACE_SIDEBAR_IDX_AREA,
    payload: {
      pageIdx,
      areaState,
    },
  });
};

const workspaceSidePageAndName = (areaState, name) => {
  store.dispatch({
    type: WORKSPACE_SIDEPAGE_NAME,
    payload: {
      areaState,
      name,
    },
  });
};

const workspaceSidePageChange = (areaState) => {
  store.dispatch({
    type: WORKSPACE_SIDEPAGE_CHANGE,
    payload: {
      areaState,
    },
  });
};

const workspaceCurrItemKeyChange = (key) => {
  store.dispatch({
    type: WORKSPACE_CURRENT_ITEM_KEY,
    payload: {
      key,
    },
  });
};

const workspaceSideMenuPageIdx = (pageIdx) => {
  store.dispatch({
    type: WORKSPACE_SIDEMENU_PAGEIDX,
    payload: {
      pageIdx,
    },
  });
};

const workspaceUpdateDragInfo = (dragInfo) => {
  store.dispatch({
    type: WORKSPACE_UPDATE_DRAGINFO,
    payload: {
      dragInfo,
    },
  });
};


export default {
  workspacePageChange,
  workspaceSideBarArea,
  workspaceSideBarIdxAndArea,
  workspaceSidePageChange,
  workspaceSidePageAndName,
  workspaceCurrItemKeyChange,
  workspaceSideMenuPageIdx,
  workspaceUpdateDragInfo,
};
