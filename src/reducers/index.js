import { combineReducers } from 'redux';
import timeReducer from './time/time.reducer';
import timersReducer from './timers/timers.reducer';

const rootReducer = combineReducers({
  timeState: timeReducer,
  timersState: timersReducer,
});

export default rootReducer;
