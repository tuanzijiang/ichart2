export const BASE_FONT = 16;

export const COLOE_SWITCH = {
  $black_1: '#212121',
  $black_2: '#666',
  $black_3: '#393e41',
  /* White */
  $white_1: '#eee',

  /* Blue */
  $blue_1: '#5aa7ef',

  /* Red */
  $red_1: '#ed6c5f',
};

export const rem = px => `${px / BASE_FONT}rem`;

export const color = col => COLOE_SWITCH[col];

const obtain = (num, prefix) => (
  `${prefix || ''}_${[...Array(num || 10).keys()].reduce(pre => (
    `${pre}${Math.floor(Math.random() * 10)}`
  ), '')}`
);

export class KeyCreator {
  constructor() {
    this.historyKey = [];
  }

  create(num, prefix) {
    if (num < 10) {
      return null;
    }
    let currKey = obtain(num, prefix);
    while (this.historyKey.includes(currKey)) {
      currKey = obtain(num, prefix);
    }
    this.historyKey.push(currKey);
    return currKey;
  }
}

export const printError = (err) => {
  console.error(err)// eslint-disable-line
};

export const isEqual = (obj1, obj2) => {
  const typeStr1 = Object.prototype.toString.call(obj1);
  const typeStr2 = Object.prototype.toString.call(obj2);
  if (typeStr1 !== typeStr2) return false;
  if (typeStr1 === '[object Array]' && obj1.length === obj2.length) {
    return obj1.every((v, i) => isEqual(v, obj2[i]));
  }
  if (typeStr1 === '[object Array]' && obj1.length !== obj2.length) {
    return false;
  }
  if (typeStr1 === '[object Object]') {
    const objEntries1 = Object.entries(obj1);
    const objEntries2 = Object.entries(obj2);
    if (objEntries1.length !== objEntries2.length) {
      return false;
    }
    return objEntries1.every(v => isEqual(v[1], obj2[v[0]]));
  }
  return obj1 === obj2;
};

export const shouldMerge = (oldObj, newObj) => (
  oldObj && newObj && !Object.keys(newObj).every(attr => isEqual(oldObj[attr], newObj[attr]))
);
