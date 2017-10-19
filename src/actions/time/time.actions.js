import { last } from 'lodash';

import {
  UPDATE_TIMEKEEPER,
  UNDO_UPDATE_TIME_HISTORY,
  UPDATE_TIME_HISTORY,
} from '../../constants/action-types';
import { updateTimers } from '../timers/timers.actions';

export function undoUpdateTime(ms) {
  return (dispatch, getState) => {
    const { time } = getState().historyState;
    const lastMsIndex = (time.length - 3 > -1) ? time.length - 3 : 0;
    const lastMs = time[lastMsIndex];

    dispatch({ type: UPDATE_TIMEKEEPER, ms });
    dispatch({ type: UNDO_UPDATE_TIME_HISTORY });
    return updateTimers(dispatch, ms, lastMs);
  };
}

export function updateTime(ms) {
  return (dispatch, getState) => {
    const { time } = getState().historyState;
    const lastMs = last(time);

    dispatch({ type: UPDATE_TIMEKEEPER, ms });
    dispatch({ type: UPDATE_TIME_HISTORY, ms });
    return updateTimers(dispatch, ms, lastMs);
  };
}

export function setTime(ms) {
  return (dispatch, getState) => {
    const { time } = getState().historyState;
    const lastMs = last(time);

    dispatch({ type: UPDATE_TIMEKEEPER, ms });
    return updateTimers(dispatch, ms, lastMs);
  };
}
