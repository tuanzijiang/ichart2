import { TYPE_GRAPHICS } from 'constants';
import column1 from './examples/column-default1';
import line1 from './examples/line-default1';

const defaultTypes = [
  'bar',
  'line',
];

export default [
  {
    name: '常用模板',
    type: TYPE_GRAPHICS,
    contents: [
      {
        name: 'model-default1',
        showName: true,
        number: 1,
        configs: {
          ...column1,
        },
        defaultType: defaultTypes[0],
        dataConfig: {
          x: [],
          y: [],
        },
        imgs: [
          './public/img/model-default1.png',
        ],
      },
      {
        name: 'model-default2',
        showName: true,
        number: 1,
        configs: {
          ...line1,
        },
        defaultType: defaultTypes[1],
        dataConfig: {
          x: [],
          y: [],
        },
        imgs: [
          './public/img/model-default2.png',
        ],
      },
    ],
  },
  {
    name: '常用图表',
  },
  {
    name: '常用字体',
  },
  {
    name: '上传图片',
  },
  {
    name: '地图',
  },
];
