const isOneDimensional = data => (
  Object.prototype.toString.call((data[0] || {}).val) !== '[object Array]'
);

export const createSeries = (data, attr, defaultConfig, mainKeys) => {
  if (isOneDimensional(data)) {
    return [{
      name: attr.match(/^([0-9]*):(.*)/)[2],
      type: defaultConfig.defaultType,
      data: data.map((currData, idx) => ({
        value: currData.val,
        name: mainKeys[idx],
      })),
    }];
  }
  return data.map(currData => ({
    name: currData.type,
    type: defaultConfig.defaultType,
    data: currData.val.map((val, idx) => ({
      value: val,
      name: mainKeys[idx],
    })),
  }));
};
