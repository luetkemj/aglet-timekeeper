import {
  INCREMENT_TIME,
  DECREMENT_TIME,
} from '../../constants/action-types';

const initialState = {
  ms: 0,
  days: 1,
  hours: '00',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: 0,
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_TIME:
      return Object.assign({}, state, action.timeUI);
    case DECREMENT_TIME:
      return Object.assign({}, state, {
        ms: state.ms - action.timeUI.ms <= 0 ? 0 : state.ms - action.timeUI.ms,
      });
    default:
      return state;
  }
}
