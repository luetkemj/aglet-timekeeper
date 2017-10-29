import { cloneDeep, filter, findIndex, isUndefined } from 'lodash';
import { insertTimer } from './timers.utils';

import {
  ADD_TIMER,
  ADD_TIMER_ERROR,
  CLEAR_ADD_TIMER_ERROR,
  REMOVE_TIMER,
  REMOVE_ALL_TIMERS,
  SET_TIMERS,
  UPDATE_TIMERS,
} from '../../constants/action-types';

const initialState = {
  timers: [],
  active: [],
  expired: [],
  recentlyExpired: [],
  error: null,
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TIMER: {
      const timers = insertTimer(state.timers, action.timer);

      return Object.assign({}, state, {
        timers,
        active: state.active,
        expired: state.expired,
        error: null,
      });
    }

    case ADD_TIMER_ERROR: {
      return Object.assign({}, state, {
        error: action.error,
      });
    }

    case CLEAR_ADD_TIMER_ERROR: {
      return Object.assign({}, state, {
        error: null,
      });
    }

    case REMOVE_ALL_TIMERS: {
      return Object.assign({}, state, initialState);
    }

    case REMOVE_TIMER: {
      return Object.assign({}, state, {
        timers: [
          ...state.timers.slice(0, action.index),
          ...state.timers.slice(action.index + 1),
        ],
        active: state.active,
        expired: state.expired,
      });
    }

    case SET_TIMERS: {
      return Object.assign({}, state, {
        timers: action.timers,
      });
    }

    case UPDATE_TIMERS: {
      const timers = cloneDeep(state.timers);
      const cuttOffIndex = findIndex(timers, o => o.ms > action.ms) || 0;
      let active;
      let expired;
      if (cuttOffIndex === -1) {
        // no timer is active
        active = [];
        expired = [...timers.slice(0)].reverse();
      } else if (cuttOffIndex === 0) {
        // no timer is inactive
        active = [...timers.slice(0)];
        expired = [];
      } else {
        active = [...timers.slice(cuttOffIndex)];
        expired = [...timers.slice(0, cuttOffIndex)].reverse();
      }

      // find the most recently expired timers
      let recentlyExpired;
      // action.lastMs will be 0 when the first increment button is pressed so we cannot just test
      // for falsey or not
      if (!isUndefined(action.lastMs)) {
        const expiredTimers = cloneDeep(expired);

        // find the index of the first expired timer with an ms <= action.lastMs
        const expiredCuttOffIndex = findIndex(expiredTimers, o => o.ms <= action.lastMs);

        if (expiredCuttOffIndex < 0) {
          // If expiredCuttOffIndex < 0 we know that no timer exists with an ms <= action.lastMs
          // however this does not mean no timers exist or have expired.
          // When the system is new, ex: action.lastMs === 0, timer(s) can exist with an ms
          // greater than action.lastMs (greater than 0)
          // To account for this we check to see if there are indeed expiredTimers by checking if
          // expiredTimers[0] is defined.
          if (!isUndefined(expiredTimers[0])) {
          // If expiredTimers[0] is defined we know that we have expiredTimers
          // move all timers that have expired into the recentlyExpired by running a filter for all
          // timers with an ms <= to action.ms
            recentlyExpired = [...filter(expiredTimers, o => o.ms <= action.ms)];
          } else {
            // if expiredTimers[0] is undefined than there in fact no timers and we can safely
            // return an empty array
            recentlyExpired = [];
          }
        } else {
          recentlyExpired = [...expiredTimers.slice(0, expiredCuttOffIndex)];
        }
      } else {
        recentlyExpired = state.recentlyExpired;
      }

      return Object.assign({}, state, {
        timers,
        active,
        expired,
        recentlyExpired,
      });
    }

    default:
      return state;
  }
}
