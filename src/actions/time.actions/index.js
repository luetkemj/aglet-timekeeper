import {
  UNDO_UPDATE_TIME,
  UPDATE_TIME,
} from '../../constants/action-types';

export const undoUpdateTime = ms => ({ type: UNDO_UPDATE_TIME, ms });
export const updateTime = ms => ({ type: UPDATE_TIME, ms });
