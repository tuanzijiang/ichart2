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
