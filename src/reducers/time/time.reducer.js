import {
  UPDATE_TIME,
} from '../../constants/action-types';
import { buildTimeUI } from '../../utils/time-ui/time-ui.utils';

const initialState = {
  ms: 0,
  days: 1,
  hours: '12',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TIME: {
      return Object.assign({}, state, {
        ...buildTimeUI(action.ms),
      });
    }

    default:
      return state;
  }
}
