import { defaultTypes, TYPE_GRAPHICS } from 'constants';
import column1 from './examples/column-default1';
import line1 from './examples/line-default1';
import pie1 from './examples/pie-default1';

export default [
  {
    name: '常用图表',
    type: TYPE_GRAPHICS,
    contents: [
      {
        name: '柱状图',
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
        name: '折线图',
        showName: true,
        number: 1,
        configs: {
          ...line1,
        },
        defaultType: defaultTypes[2],
        dataConfig: {
          x: [],
          y: [],
        },
        imgs: [
          './public/img/model-default2.png',
        ],
      },
      {
        name: '饼图',
        showName: true,
        number: 1,
        configs: {
          ...pie1,
        },
        defaultType: defaultTypes[2],
        dataConfig: {
          x: [],
          y: [],
        },
        imgs: [
          './public/img/model-default3.png',
        ],
      },
    ],
  },
  {
    name: '常用模板',
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
