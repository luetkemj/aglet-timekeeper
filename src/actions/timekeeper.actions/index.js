import {
  UPDATE_TIME,
} from '../../constants/action-types';
import { buildTimeUI } from '../../utils/index';

export const updateTime = ms => ({ type: UPDATE_TIME, timeUI: buildTimeUI(ms) });
