import {
  ADD_TIMER,
  REMOVE_TIMER,
} from '../../constants/action-types';

export const addTimer = timer => ({ type: ADD_TIMER, timer });
export const removeTimer = index => ({ type: REMOVE_TIMER, index });
