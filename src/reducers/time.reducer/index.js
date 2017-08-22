import { cloneDeep, isNull, isUndefined, orderBy, pullAt } from 'lodash';
import moment from 'moment';

import {
  ADD_BUTTON,
  REMOVE_BUTTONS,
  RESET_TIME,
  RESTORE_ALL_DEFAULTS,
  UPDATE_FORMAT,
  UPDATE_TIME,
} from '../../constants/action-types';
import { buildTimeUI } from '../../utils/index';

const initialState = {
  ms: 0,
  days: 1,
  hours: '12',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,

  timeFormat: false,
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

let timeKeeperState;
const agletTimekeeperData = localStorage.getItem('agletTimekeeper');

if (agletTimekeeperData) {
  const data = JSON.parse(agletTimekeeperData);

  const timeFormat = (!isNull(data.timeFormat) || !isUndefined(data.timeFormat)) ?
    data.timeFormat : initialState.timeFormat;
  const timeUI = buildTimeUI(data.ms || 0, timeFormat);
  const buttons = data.buttons || initialState.buttons;

  timeKeeperState = {
    ...timeUI,
    timeFormat,
    buttons,
  };
}

export default function timeReducer(state = timeKeeperState || initialState, action) {
  switch (action.type) {
    case RESET_TIME: {
      // build new state
      const timeUI = buildTimeUI(0, state.timeFormat);
      const newState = Object.assign({}, state, {
        ...timeUI,
      });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        timeFormat: newState.timeFormat,
        buttons: newState.buttons,
      }));
      return newState;
    }
    case UPDATE_TIME: {
      // build new state
      const timeUI = buildTimeUI(action.ms, state.timeFormat);
      const newState = Object.assign({}, state, {
        ...timeUI,
      });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        timeFormat: newState.timeFormat,
        buttons: newState.buttons,
      }));
      return newState;
    }

    case UPDATE_FORMAT: {
      // build new state
      const timeUI = buildTimeUI(state.ms, action.format);
      const newState = Object.assign({}, state, {
        ...timeUI,
        timeFormat: action.format,
      });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        timeFormat: newState.timeFormat,
        buttons: newState.buttons,
      }));
      return newState;
    }

    case REMOVE_BUTTONS: {
      const buttons = cloneDeep(state.buttons);
      pullAt(buttons, action.buttons);

      const newState = Object.assign({}, state, { buttons });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        timeFormat: newState.timeFormat,
        buttons: newState.buttons,
      }));
      return newState;
    }

    case ADD_BUTTON: {
      let buttons = cloneDeep(state.buttons);
      buttons.push(action.button);
      buttons = orderBy(buttons,
        button => moment.duration(button.duration, button.unit).asMilliseconds());

      const newState = Object.assign({}, state, { buttons });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        timeFormat: newState.timeFormat,
        buttons: newState.buttons,
      }));
      return newState;
    }

    case RESTORE_ALL_DEFAULTS: {
      const newState = Object.assign({}, state, {
        buttons: initialState.buttons,
        timeFormat: initialState.timeFormat,
      });
      // persist new state to local storage
      localStorage.setItem('agletTimekeeper', JSON.stringify({
        ms: newState.ms,
        timeFormat: newState.timeFormat,
        buttons: newState.buttons,
      }));
      return newState;
    }

    default:
      return state;
  }
}
