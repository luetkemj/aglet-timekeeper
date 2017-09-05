import {
  ADD_TIMER,
  REMOVE_TIMER,
} from '../../constants/action-types';

export const addTimer = (timer, ms) => ({ type: ADD_TIMER, timer, ms });
export const removeTimer = index => ({ type: REMOVE_TIMER, index });
