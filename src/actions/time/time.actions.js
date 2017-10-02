import {
  RESET_TIME,
  UNDO_UPDATE_TIME,
  UPDATE_TIME,
} from '../../constants/action-types';
import { updateTimers } from '../timers/timers.actions';

export function undoUpdateTime(ms) {
  return (dispatch, getState) => {
    const { history } = getState().timeState;
    const lastMs = history[history.length - 1];

    dispatch({ type: UNDO_UPDATE_TIME, ms });
    return updateTimers(dispatch, ms, lastMs);
  };
}

export function updateTime(ms) {
  return (dispatch, getState) => {
    const { history } = getState().timeState;
    const lastMs = history[history.length - 1];

    dispatch({ type: UPDATE_TIME, ms });
    return updateTimers(dispatch, ms, lastMs);
  };
}

export function resetTime() {
  return (dispatch) => {
    dispatch({ type: RESET_TIME });
  };
}
