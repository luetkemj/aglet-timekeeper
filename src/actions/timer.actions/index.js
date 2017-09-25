import {
  ADD_TIMER,
  REMOVE_TIMER,
  UPDATE_TIMERS,
} from '../../constants/action-types';

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

export function removeTimer(index) {
  return (dispatch, getState) => {
    const { ms } = getState().timeState;
    dispatch({ type: REMOVE_TIMER, index });
    return updateTimers(dispatch, ms);
  };
}
