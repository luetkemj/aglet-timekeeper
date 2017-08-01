import { combineReducers } from 'redux';
import timeReducer from './time.reducer';

const rootReducer = combineReducers({
  timeState: timeReducer,
});

export default rootReducer;
