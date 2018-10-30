import XLSX from 'xlsx';
import { add } from './db';

const weight = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const weight2 = weight.reduce((pre, cur, idx) => ({
  ...pre,
  [cur]: idx,
}), {});


const getColumnIdx = (columnName) => {
  let step = 1;
  return columnName.split('').reduceRight((prev, curr) => {
    const currWeight = weight2[curr];
    const result = prev + currWeight * step;
    step *= 26;
    return result;
  }, 0) - 1;
};

const getColumnName = (idx) => {
  let curr = idx + 1;
  const result = [];
  while (curr !== 0) {
    const currResult = Math.floor(curr % 26);
    result.unshift(currResult);
    curr = Math.floor(curr / 26);
  }
  return result.map(v => weight[v]).join('');
};

const getRange = (ref) => {
  const [leftUpper, rightBottom] = ref.split(':');
  const [, YStart, XStart] = leftUpper.match(/^([A-Z]*)([0-9]*)/);
  const [, YEnd, XEnd] = rightBottom.match(/^([A-Z]*)([0-9]*)/);
  return {
    XStart: XStart - 1,
    XEnd: XEnd - 1,
    YStart: getColumnIdx(YStart),
    YEnd: getColumnIdx(YEnd),
  };
};

const createObjs = (sheet) => {
  const {
    XStart, XEnd, YStart, YEnd,
  } = getRange(sheet['!ref']);
  const objs = [];
  for (let i = XStart; i <= XEnd; i += 1) {
    const currObj = [];
    let validNum = 0;
    for (let j = YStart; j <= YEnd; j += 1) {
      const currCelName = `${getColumnName(j)}${i + 1}`;
      const currCelVal = sheet[currCelName];
      currObj[j] = (currCelVal || {}).v;
      if (currObj[j] !== undefined && currObj[j] !== null) {
        validNum += 1;
      }
    }
    currObj.key = i === XStart ? 'title' : i;
    if (validNum) {
      objs.push(currObj);
    }
  }
  return objs;
};

const read = (file) => {
  if (file) {
    const rABS = true;
    const reader = new FileReader();
    reader.onload = (e) => {
      let data = e.target.result;
      if (!rABS) {
        data = new Uint8Array(data);
      }
      const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const objs = createObjs(sheet);
      add(objs);
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }
};

export default {
  read,
};
