import { cloneDeep, orderBy, pullAt } from 'lodash';
import moment from 'moment';

import {
  ADD_BUTTON,
  REMOVE_BUTTONS,
  RESET_TIME,
  UPDATE_FORMAT,
  UPDATE_TIME,
} from '../../constants/action-types';
import { buildTimeUI, compareKeys } from '../../utils/index';

const initialState = {
  ms: 0,
  days: 1,
  hours: '12',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
  militaryTime: false,
  buttons: [{
    unit: 'seconds',
    duration: 6,
  },
  {
    unit: 'minutes',
    duration: 5,
  },
  {
    unit: 'minutes',
    duration: 10,
  },
  {
    unit: 'hours',
    duration: 1,
  },
  {
    unit: 'hours',
    duration: 8,
  }],
};

const localStorage = window.localStorage;
let timeKeeperState = JSON.parse(localStorage.getItem('timeKeeperState'));

if (timeKeeperState) {
  if (!compareKeys(timeKeeperState, initialState)) {
    timeKeeperState = null;
  }
}

export default function timeReducer(state = timeKeeperState || initialState, action) {
  switch (action.type) {
    case RESET_TIME: {
      // build new state
      const timeUI = buildTimeUI(0, state.militaryTime);
      const newState = Object.assign({}, state, {
        ...timeUI,
      });
      // persist new state to local storage
      localStorage.setItem('timeKeeperState', JSON.stringify(newState));
      return newState;
    }
    case UPDATE_TIME: {
      // build new state
      const timeUI = buildTimeUI(action.ms, state.militaryTime);
      const newState = Object.assign({}, state, {
        ...timeUI,
      });
      // persist new state to local storage
      localStorage.setItem('timeKeeperState', JSON.stringify(newState));
      return newState;
    }

    case UPDATE_FORMAT: {
      // build new state
      const timeUI = buildTimeUI(state.ms, action.format);
      const newState = Object.assign({}, state, {
        ...timeUI,
        militaryTime: action.format,
      });
      // persist new state to local storage
      localStorage.setItem('timeKeeperState', JSON.stringify(newState));
      return newState;
    }

    case REMOVE_BUTTONS: {
      const buttons = cloneDeep(state.buttons);
      pullAt(buttons, action.buttons);
      return Object.assign({}, state, { buttons });
    }

    case ADD_BUTTON: {
      let buttons = cloneDeep(state.buttons);
      buttons.push(action.button);
      buttons = orderBy(buttons,
        button => moment.duration(button.duration, button.unit).asMilliseconds());

      return Object.assign({}, state, { buttons });
    }

    default:
      return state;
  }
}
