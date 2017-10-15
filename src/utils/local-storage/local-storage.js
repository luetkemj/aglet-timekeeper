// @flow
import config from '../../config';

export function parseLocalStorageData(data: ?string) {
  if (!data) {
    return null;
  }

  let localStorageData;

  try {
    localStorageData = JSON.parse(data);
  } catch (error) {
    throw Error(`LocalStorage is corrupt. Failed to parse string: ${data}`);
  }

  if (localStorageData && typeof localStorageData !== 'object') {
    throw Error(`LocalStorage is corrupt. Expected 'object' got ${typeof localStorageData}: ${localStorageData}`);
  }

  return localStorageData;
}


export function updateLocalStorage(data: Object) {
  if (typeof data !== 'object') {
    throw Error(`updateLocalStorage expects the first argument to be typeof 'object', received ${typeof data}`);
  }

  const localStorageData: ?Object =
    parseLocalStorageData(window.localStorage.getItem(config.localStorage.namespace));

  const newLocalStorageData = Object.assign({}, localStorageData, data);
  localStorage.setItem(config.localStorage.namespace, JSON.stringify(newLocalStorageData));
}

export function getInitialHistoryStateFromLocalStorage() {
  const historyState = {};
  const localStorageData: ?Object =
    parseLocalStorageData(window.localStorage.getItem(config.localStorage.namespace));

  if (localStorageData) {
    // backwards campatible - check old localStorageData structure and upgrade it if necessary
    if (localStorageData && localStorageData.history && Array.isArray(localStorageData.history)) {
      return Object.assign({}, historyState, {
        time: localStorageData.history,
      });
    }

    // old localStorageData structure does not exist.
    // return localStorageData if it exists, else start over at [0]
    if (localStorageData) {
      return localStorageData.history || { time: [0] };
    }
  }

  // no initial history exists so we initialize at [0]
  return { time: [0] };
}
