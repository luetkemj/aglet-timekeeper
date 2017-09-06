import {
  UNDO_UPDATE_TIME,
  UPDATE_TIME,
} from '../../constants/action-types';
import { updateTimers } from '../timer.actions';

export function undoUpdateTime(ms) {
  return (dispatch) => {
    dispatch({ type: UNDO_UPDATE_TIME, ms });
    return updateTimers(dispatch, ms);
  };
}

export function updateTime(ms) {
  return (dispatch) => {
    dispatch({ type: UPDATE_TIME, ms });
    return updateTimers(dispatch, ms);
  };
}
