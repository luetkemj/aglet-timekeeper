import {
  ADD_TIMER,
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

export function addTimer(timer) {
  return (dispatch, getState) => {
    const { ms } = getState().timeState;
    dispatch({ type: ADD_TIMER, timer, ms });
    return updateTimers(dispatch, ms);
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
