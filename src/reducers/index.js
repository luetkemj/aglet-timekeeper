import { combineReducers } from 'redux';
import historyReducer from './history/history.reducer';
import timeReducer from './time/time.reducer';
import timersReducer from './timers/timers.reducer';

const rootReducer = combineReducers({
  historyState: historyReducer,
  timeState: timeReducer,
  timersState: timersReducer,
});

export default rootReducer;
