import { find } from 'lodash';
import { parseTimer } from '../../utils/timers-parser/timers-parser.utils';
import { createNewTimer } from '../../reducers/timers/timers.utils';

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
      const { timers } = getState().timersState;
      const parsedTimer = parseTimer(timer);
      const newTimer = createNewTimer(parsedTimer, ms);

      if (find(timers, newTimer)) {
        throw new Error('Timer already exists');
      }

      dispatch({ type: ADD_TIMER, timer: newTimer, ms });
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
