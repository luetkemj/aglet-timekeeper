import { combineReducers } from 'redux';
import timeReducer from './time.reducer';
import timersReducer from './timers.reducer';

const rootReducer = combineReducers({
  timeState: timeReducer,
  timersState: timersReducer,
});

export default rootReducer;
