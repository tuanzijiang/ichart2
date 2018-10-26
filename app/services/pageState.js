import store from 'app/store';
import {
  WORKSPACE_PAGE_CHANGE,
  WORKSPACE_SIDEBAR_AREA_CHANGE,
  WORKSPACE_SIDEBAR_IDX_AREA,
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

export default {
  workspacePageChange,
  workspaceSideBarArea,
  workspaceSideBarIdxAndArea,
};
