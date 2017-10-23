import config from '../../config';
import {
  UPDATE_TIME_HISTORY,
  UNDO_UPDATE_TIME_HISTORY,
  RESET_TIME_HISTORY,
  ADD_TIMER,
} from '../../constants/action-types';
import { createNewTimer, insertTimer } from '../timers/timers.utils';
import { getInitialHistoryStateFromLocalStorage, updateLocalStorage } from '../../utils/local-storage/local-storage';

const initialState = {
  time: [0],
  timers: [],
};

const localStorageData = getInitialHistoryStateFromLocalStorage();

export default function timeReducer(state = localStorageData || initialState, action) {
  switch (action.type) {
    case UPDATE_TIME_HISTORY: {
      const time = state.time;
      time.push(action.ms);

      const newState = Object.assign({}, state, {
        time,
      });

      updateLocalStorage({ [config.localStorage.history]: { ...newState } });
      return newState;
    }

    case UNDO_UPDATE_TIME_HISTORY: {
      const time = state.time;
      if (time.length > 1) {
        time.pop();
      }

      const newState = Object.assign({}, state, {
        time,
      });

      updateLocalStorage({ [config.localStorage.history]: { ...newState } });
      return newState;
    }

    case RESET_TIME_HISTORY: {
      const newState = Object.assign({}, state, {
        time: [action.ms],
      });

      updateLocalStorage({ [config.localStorage.history]: { ...newState } });
      return newState;
    }

    case ADD_TIMER: {
      const timer = createNewTimer(action.timer, action.ms);
      const timers = insertTimer(state.timers, timer);

      const newState = Object.assign({}, state, {
        timers,
      });

      updateLocalStorage({ [config.localStorage.history]: { ...newState } });
      return newState;
    }

    default:
      return state;
  }
}
