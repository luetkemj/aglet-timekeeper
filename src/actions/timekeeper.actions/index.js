import {
  RESET_TIME,
  UPDATE_FORMAT,
  UPDATE_TIME,
} from '../../constants/action-types';

export const resetTime = () => ({ type: RESET_TIME });
export const updateTime = ms => ({ type: UPDATE_TIME, ms });
export const updateFormat = format => ({ type: UPDATE_FORMAT, format });
