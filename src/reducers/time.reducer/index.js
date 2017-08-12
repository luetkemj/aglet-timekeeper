import {
  UPDATE_FORMAT,
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
  militaryTime: false,
};

const localStorage = window.localStorage;
const timeKeeperState = JSON.parse(localStorage.getItem('timeKeeperState'));

export default function timeReducer(state = timeKeeperState || initialState, action) {
  switch (action.type) {
    case UPDATE_TIME: {
      // build new state
      const timeUI = buildTimeUI(action.ms, state.militaryTime);
      const newState = Object.assign({}, state, {
        ...timeUI,
      });
      // persist new state to local storage
      localStorage.setItem('timeKeeperState', JSON.stringify(newState));
      return newState;
    }

    case UPDATE_FORMAT: {
      // build new state
      const timeUI = buildTimeUI(state.ms, action.format);
      const newState = Object.assign({}, state, {
        ...timeUI,
        militaryTime: action.format,
      });
      // persist new state to local storage
      localStorage.setItem('timeKeeperState', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}
