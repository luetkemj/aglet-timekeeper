import {
  UPDATE_TIME,
} from '../../constants/action-types';

const initialState = {
  ms: 0,
  days: 1,
  hours: '00',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TIME:
      return Object.assign({}, state, action.timeUI);
    default:
      return state;
  }
}
