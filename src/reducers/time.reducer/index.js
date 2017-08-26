import { isNull, isUndefined } from 'lodash';

import {
  UPDATE_TIME,
} from '../../constants/action-types';
import { buildTimeUI } from '../../utils/index';

const initialState = {
  ms: 0,
  days: 1,
  hours: '12',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
};

const localStorage = window.localStorage;

let timeKeeperState;
const agletTimekeeperData = localStorage.getItem('agletTimekeeper');

if (agletTimekeeperData) {
  const data = JSON.parse(agletTimekeeperData);

  const timeFormat = (!isNull(data.timeFormat) || !isUndefined(data.timeFormat)) ?
    data.timeFormat : initialState.timeFormat;
  const timeUI = buildTimeUI(data.ms || 0, timeFormat);

  timeKeeperState = {
    ...timeUI,
  };
}

export default function timeReducer(state = timeKeeperState || initialState, action) {
  switch (action.type) {
    case UPDATE_TIME: {
      // build new state
      const timeUI = buildTimeUI(action.ms, state.timeFormat);
      const newState = Object.assign({}, state, {
        ...timeUI,
      });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
      }));
      return newState;
    }

    default:
      return state;
  }
}
