import { last } from 'lodash';

import { getInitialHistoryStateFromLocalStorage } from '../../utils/local-storage/local-storage';
import { setTime } from '../../actions/time/time.actions';
import { setTimers } from '../../actions/timers/timers.actions';

export function bootstrap() {
  return (dispatch) => {
    const history = getInitialHistoryStateFromLocalStorage();
    dispatch(setTimers(history.timers));
    dispatch(setTime(last(history.time)));
  };
}
