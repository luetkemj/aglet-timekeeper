import { findIndex, sortedIndexBy } from 'lodash';

import {
  ADD_TIMER,
  REMOVE_TIMER,
  UPDATE_TIMERS,
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
      newTimer.ms = action.timer.ms + action.ms;

      // find index to insert new timer
      const index = sortedIndexBy(state.timers, newTimer, 'ms');

      const timers = [
        ...state.timers.slice(0, index),
        newTimer,
        ...state.timers.slice(index),
      ];

      return {
        timers,
        active: state.active,
        expired: state.expired,
      };
    }

    case REMOVE_TIMER: {
      return {
        timers: [
          ...state.timers.slice(0, action.index),
          ...state.timers.slice(action.index + 1),
        ],
        active: state.active,
        expired: state.expired,
      };
    }

    case UPDATE_TIMERS: {
      const timers = state.timers;
      const cuttOffIndex = findIndex(timers, o => o.ms > action.ms);

      const active = [
        ...timers.slice(cuttOffIndex),
      ];
      const expired = [
        ...timers.slice(0, cuttOffIndex),
      ];

      return {
        timers,
        active,
        expired,
      };
    }

    default:
      return state;
  }
}
