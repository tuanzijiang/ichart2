export const BASE_FONT = 16;

export const COLOE_SWITCH = {
  $black_1: '#212121',
  $black_2: '#666',
  $black_3: '#393e41',
  /* White */
  $white_1: '#eee',

  /* Blue */
  $blue_1: '#5aa7ef',
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
