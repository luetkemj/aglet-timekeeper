import {
  UNDO_UPDATE_TIME,
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
  history: [0],
};

const localStorage = window.localStorage;

let timeKeeperState;
const agletTimekeeperData = localStorage.getItem('agletTimekeeper');

if (agletTimekeeperData) {
  const data = JSON.parse(agletTimekeeperData);
  // if there is no stored ms in data start at 0
  const timeUI = buildTimeUI(data.ms || 0);

  // if there is no history use timeUI.ms as our first mark
  let history = data.history;
  history = history || [timeUI.ms];

  timeKeeperState = {
    ...timeUI,
    history,
  };
}

export default function timeReducer(state = timeKeeperState || initialState, action) {
  switch (action.type) {
    case UPDATE_TIME: {
      // build new state
      const timeUI = buildTimeUI(action.ms);
      const history = state.history;
      history.push(action.ms);

      const newState = Object.assign({}, state, {
        ...timeUI,
        history,
      });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        history,
      }));
      return newState;
    }

    case UNDO_UPDATE_TIME: {
      // remove the last entry in the history
      const history = state.history;
      history.pop();

      // build new state
      const timeUI = buildTimeUI(history[history.length - 1]);

      const newState = Object.assign({}, state, {
        ...timeUI,
        history,
      });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        history,
      }));
      return newState;
    }

    default:
      return state;
  }
}
