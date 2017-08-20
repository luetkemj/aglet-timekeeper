import {
  ADD_BUTTON,
  REMOVE_BUTTONS,
  RESET_TIME,
  UPDATE_FORMAT,
  UPDATE_TIME,
} from '../../constants/action-types';

export const addButton = button => ({ type: ADD_BUTTON, button });
export const removeButtons = buttons => ({ type: REMOVE_BUTTONS, buttons });
export const resetTime = () => ({ type: RESET_TIME });
export const updateTime = ms => ({ type: UPDATE_TIME, ms });
export const updateFormat = format => ({ type: UPDATE_FORMAT, format });
