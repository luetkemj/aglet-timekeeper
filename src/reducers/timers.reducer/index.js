import { findIndex, sortedIndexBy } from 'lodash';

import {
  ADD_TIMER,
  REMOVE_TIMER,
} from '../../constants/action-types';

const initialState = {
  timers: [],
  active: [],
  expired: [],
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TIMER: {
      const newTimer = { ...action.timer };
      console.log(newTimer);
      newTimer.ms = action.timer.ms + action.ms;
      console.log(newTimer);

      // find index to insert new timer
      const index = sortedIndexBy(state.timers, newTimer, 'ms');

      const timers = [
        ...state.timers.slice(0, index),
        newTimer,
        ...state.timers.slice(index),
      ];

      const cuttOffIndex = findIndex(timers, o => o.ms > newTimer.ms);
      console.log(cuttOffIndex);

      const active = [
        ...timers.slice(0, cuttOffIndex),
      ];
      const expired = [
        ...timers.slice(cuttOffIndex),
      ];

      return {
        timers,
        active,
        expired,
      };
    }

    // @TODO
    // need to remove timers from active and expired in here as well - should make a function for it
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
