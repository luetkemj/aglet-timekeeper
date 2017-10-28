import { parseTimer } from '../../utils/timers-parser/timers-parser.utils';

import {
  ADD_TIMER,
  ADD_TIMER_ERROR,
  CLEAR_ADD_TIMER_ERROR,
  REMOVE_TIMER,
  REMOVE_ALL_TIMERS,
  SET_TIMERS,
  UPDATE_TIMERS,
} from '../../constants/action-types';

export function setTimers(timers) {
  return dispatch => dispatch({ type: SET_TIMERS, timers });
}

export function updateTimers(dispatch, ms, lastMs) {
  return dispatch({ type: UPDATE_TIMERS, ms, lastMs });
}

export function clearAddTimerError() {
  return dispatch => dispatch({ type: CLEAR_ADD_TIMER_ERROR });
}

export function addTimer(timer) {
  return (dispatch, getState) => {
    try {
      const { ms } = getState().timeState;
      const parsedTimer = parseTimer(timer);
      dispatch({ type: ADD_TIMER, timer: parsedTimer, ms });
      return updateTimers(dispatch, ms);
    } catch (error) {
      return dispatch({ type: ADD_TIMER_ERROR, error });
    }
  };
}

export function removeAllTimers() {
  return dispatch => dispatch({ type: REMOVE_ALL_TIMERS });
}

export function removeTimer(index) {
  return (dispatch, getState) => {
    const { ms } = getState().timeState;
    dispatch({ type: REMOVE_TIMER, index });
    return updateTimers(dispatch, ms);
  };
}
