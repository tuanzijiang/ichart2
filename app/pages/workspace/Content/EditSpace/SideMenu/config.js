import {
  GRAPHIC_PREFIX,
} from 'constants';
import pageStateService from 'services/pageState';

const DATA_SRC_STR = '数据源';
const SETTING_STR = '设置';

export default {
  [GRAPHIC_PREFIX]: [
    {
      text: DATA_SRC_STR,
      clickHandler: () => {
        pageStateService.workspaceSideMenuPageIdx(0);
      },
    },
    {
      text: SETTING_STR,
      clickHandler: () => {
        pageStateService.workspaceSideMenuPageIdx(1);
      },
    },
  ],
};
