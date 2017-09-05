import {
  ADD_TIMER,
  REMOVE_TIMER,
  UPDATE_TIMERS,
} from '../../constants/action-types';

// @TODO
// get redux think so I can add ms from state and fire off UPDATE_TIMERS when ADD and REMOVE is done
export const addTimer = (timer, ms) => ({ type: ADD_TIMER, timer, ms });
export const removeTimer = index => ({ type: REMOVE_TIMER, index });
export const updateTimers = ms => ({ type: UPDATE_TIMERS, ms });
