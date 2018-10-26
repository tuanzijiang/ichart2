import column1 from './examples/column-default1';

export default [
  {
    name: '常用模板',
    contents: [
      {
        name: 'model-default1',
        showName: false,
        number: 1,
        configs: [
          { ...column1 },
        ],
        imgs: [
          './public/img/model-default1.png',
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
