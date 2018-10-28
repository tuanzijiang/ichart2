import { printError } from 'tools';

const databaseName = 'excel';
const objectStoreName = 'sheet';
const version = 2;
const MAX_NUM = 5;

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

export const clear = () => {
  open();
  const transaction = db.transaction([objectStoreName], 'readwrite');
  const objectStore = transaction.objectStore(objectStoreName);

  objectStore.clear();
};

open();

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
    } else {
      cb(obtainArr);
    }
  };
};
