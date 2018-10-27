import column1 from './examples/column-default1';

const TYPE_GRAPHICS = Symbol('TYPE_GRAPHICS');

export default [
  {
    name: '常用模板',
    type: TYPE_GRAPHICS,
    contents: [
      {
        name: 'model-default1',
        showName: true,
        number: 1,
        configs: [
          { ...column1 },
        ],
        imgs: [
          './public/img/model-default1.png',
        ],
      },
      {
        name: 'model-default2',
        showName: true,
        number: 1,
        configs: [
          { ...column1 },
        ],
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
