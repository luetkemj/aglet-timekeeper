import {
  RESET_TIME_HISTORY,
} from '../../constants/action-types';

export function resetTimeHistory() {
  return dispatch => dispatch({ type: RESET_TIME_HISTORY });
}
