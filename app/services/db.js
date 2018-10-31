import { printError } from 'tools';

const databaseName = 'excel';
const objectStoreName = 'sheet';
const version = 2;
const MAX_NUM = 5;
const SEPARATOR = '*';

export const DATA_HANDLER_SUM = Symbol('DATA_HANDLER_SUM');
export const DATA_HANDLER_AVE = Symbol('DATA_HANDLER_AVE');

const getNextItem = (typeItem, currY, type) => {
  switch (type) {
    case DATA_HANDLER_SUM: {
      const currGroupNum = typeItem.num || 0;
      const currGroupVal = typeItem.val || 0;
      return {
        num: currGroupNum + 1,
        val: currGroupVal + currY,
      };
    }
    case DATA_HANDLER_AVE: {
      const currGroupNum = typeItem.num || 0;
      const currGroupVal = typeItem.val || 0;
      return {
        num: currGroupNum + 1,
        val: (currGroupVal * currGroupNum + currY) / (currGroupNum + 1),
      };
    }
    default:
      break;
  }
  return null;
};

const obtainArr = [];

let request = null;
let db = null;

const open = () => {
  if (!request && !db) {
    request = window.indexedDB.open(databaseName, version);

    request.onsuccess = (e) => {
      db = e.target.result;
    };

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      db.deleteObjectStore(objectStoreName);
      db.createObjectStore(objectStoreName, { keyPath: 'key', autoIncrement: false });
    };

    request.onerror = (e) => {
      printError(e);
    };
  }
};

const getObjsMeta = (objs) => {
  const statisticMap = [];
  for (let i = 1; i < objs.length; i += 1) {
    const currObj = objs[i];
    currObj.forEach((val, idx) => {
      if (val !== undefined) {
        const currMap = statisticMap[idx] || {};
        const currNum = currMap[val] || 0;
        currMap[val] = currNum + 1;
        statisticMap[idx] = currMap;
      }
    });
  }

  const typeNumPerAttr = statisticMap.map(val => (Object.keys(val).length));
  typeNumPerAttr.key = 'typeNumPerAttr';
  const maxsPerAttr = statisticMap.map((val) => {
    const maxsObj = Object.entries(val).reduce((prev, [key, num]) => {
      const topEl = prev[0];
      if (!topEl || (topEl.num <= num && prev.length < MAX_NUM)) {
        prev.push({
          key,
          num,
        });
      }
      if (topEl && topEl.num < num && prev.length >= MAX_NUM) {
        prev[0] = ({
          key,
          num,
        });
        prev.shift();
        prev.sort((a, b) => (a.num - b.num));
      }
      return prev;
    }, []);
    return maxsObj;
  }).map(maxObj => maxObj.sort((a, b) => (b.num - a.num)).map(v => v.key));
  maxsPerAttr.key = 'maxsPerAttr';
  return {
    typeNumPerAttr,
    maxsPerAttr,
  };
};

open();

export const clear = () => {
  open();
  const transaction = db.transaction([objectStoreName], 'readwrite');
  const objectStore = transaction.objectStore(objectStoreName);

  objectStore.clear();
};


export const close = () => {
  db.close();
  request = null;
  db = null;
};

export const add = (objs) => {
  const transaction = db.transaction([objectStoreName], 'readwrite');
  const objectStore = transaction.objectStore(objectStoreName);

  objectStore.clear();

  const {
    typeNumPerAttr,
    maxsPerAttr,
  } = getObjsMeta(objs);

  objectStore.add(typeNumPerAttr);
  objectStore.add(maxsPerAttr);

  objs.forEach((obj) => {
    objectStore.add(obj);
  });
};

export const obtain = (cb) => {
  const transaction = db.transaction([objectStoreName], 'readwrite');
  const objectStore = transaction.objectStore(objectStoreName);
  obtainArr.length = 0;
  objectStore.openCursor().onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      obtainArr.push({
        key: cursor.key,
        val: cursor.value,
      });
      cursor.continue();
    } else if (Object.prototype.toString.apply(cb, this) === '[object Function]') {
      cb(obtainArr);
    }
  };
};

export const obtainByKey = (key, cb) => {
  const transaction = db.transaction([objectStoreName], 'readwrite');
  const objectStore = transaction.objectStore(objectStoreName);

  objectStore.get(key).onsuccess = (e) => {
    const cursor = e.target.result;
    if (Object.prototype.toString.apply(cb, this) === '[object Function]') {
      cb(cursor);
    }
  };
};

export const getDisplayData = ({ x: originX, y }, cb) => {
  const x = [].concat(originX);
  if (Object.prototype.toString.call(x) === '[object Array]' && x.length !== 0) {
    const typeXIdx = x.pop();
    const transaction = db.transaction([objectStoreName], 'readwrite');
    const objectStore = transaction.objectStore(objectStoreName);

    const originData = {};

    objectStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        const { key } = cursor;
        const val = cursor.value;

        if (Object.prototype.toString.call(key) === '[object Number]') {
          const typeX = val[typeXIdx];
          let groupX = x.map(idx => val[idx]).join(SEPARATOR);
          groupX = groupX.length ? groupX : typeX;
          const currY = val[y];

          const currGroup = originData[groupX] || {};
          const typeItem = currGroup[typeX] || {};

          const nextItem = getNextItem(typeItem, currY, DATA_HANDLER_AVE);

          currGroup[typeX] = nextItem;
          originData[groupX] = currGroup;
        }

        cursor.continue();
      } else if (Object.prototype.toString.call(cb) === '[object Function]') {
        const subKeys = Object.keys(originData);
        const mainKeys = subKeys.reduce((prev, curr) => (
          prev.concat(Object.keys(originData[curr]).filter(v => !prev.includes(v)))
        ), []);

        let displayData = mainKeys.reduce((prev, mainKey) => (
          prev.concat([
            {
              type: mainKey,
              val: subKeys.reduce((pre, subKey) => (
                pre.concat(((originData[subKey] || {})[mainKey] || {}).val || 0)
              ), []),
            },
          ])
        ), []);

        if (x.length === 0) {
          displayData = displayData.map((displayObj, displayIdx) => ({
            type: displayObj.type,
            val: displayObj.val[displayIdx],
          }));
        }
        cb(displayData, subKeys);
      }
    };
  }
};
