import {
  INCREMENT_TIME,
  DECREMENT_TIME,
} from '../../constants/action-types';
import { buildTimeUI } from '../../utils/index';

export const incrementTime = ms => ({ type: INCREMENT_TIME, timeUI: buildTimeUI(ms) });
export const decrementTime = ms => ({ type: DECREMENT_TIME, timeUI: buildTimeUI(ms) });
