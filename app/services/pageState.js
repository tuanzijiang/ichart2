import store from 'app/store';
import {
  WORKSPACE_PAGE_CHANGE,
  WORKSPACE_SIDEBAR_AREA_CHANGE,
  WORKSPACE_SIDEBAR_IDX_AREA,
  WORKSPACE_SIDEPAGE_CHANGE,
  WORKSPACE_SIDEPAGE_NAME,
} from 'app/store/pageState/action';

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


export default {
  workspacePageChange,
  workspaceSideBarArea,
  workspaceSideBarIdxAndArea,
  workspaceSidePageChange,
  workspaceSidePageAndName,
};
