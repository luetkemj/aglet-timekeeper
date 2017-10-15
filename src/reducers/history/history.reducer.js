import config from '../../config';
import {
  UPDATE_TIME_HISTORY,
  UNDO_UPDATE_TIME_HISTORY,
  RESET_TIME_HISTORY,
} from '../../constants/action-types';
import { getInitialHistoryStateFromLocalStorage, updateLocalStorage } from '../../utils/local-storage/local-storage';

const initialState = {
  time: [0],
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

    default:
      return state;
  }
}
