import {
  UPDATE_TIME,
} from '../../constants/action-types';

const initialState = {
  ms: 0,
  days: 1,
  hours: '00',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
};

const localStorage = window.localStorage;
const timeKeeperState = JSON.parse(localStorage.getItem('timeKeeperState'));

export default function timeReducer(state = timeKeeperState || initialState, action) {
  switch (action.type) {
    case UPDATE_TIME: {
      // build new state
      const newState = Object.assign({}, state, action.timeUI);
      // persist new state to local storage
      localStorage.setItem('timeKeeperState', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}
