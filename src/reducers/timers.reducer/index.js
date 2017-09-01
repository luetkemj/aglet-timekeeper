import { sortedIndexBy } from 'lodash';

import {
  ADD_TIMER,
  REMOVE_TIMER,
} from '../../constants/action-types';

const initialState = {
  timers: [],
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TIMER: {
      // find index to insert new timer
      const index = sortedIndexBy(state.timers, action.timer, 'ms');

      return {
        timers: [
          ...state.timers.slice(0, index),
          action.timer,
          ...state.timers.slice(index),
        ],
      };
    }

    case REMOVE_TIMER: {
      return {
        timers: [
          ...state.timers.slice(0, action.index),
          ...state.timers.slice(action.index + 1),
        ],
      };
    }

    default:
      return state;
  }
}
