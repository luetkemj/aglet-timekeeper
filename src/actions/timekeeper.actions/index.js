import {
  UNDO,
  UPDATE_TIME,
} from '../../constants/action-types';

export const undo = ms => ({ type: UNDO, ms });
export const updateTime = ms => ({ type: UPDATE_TIME, ms });
