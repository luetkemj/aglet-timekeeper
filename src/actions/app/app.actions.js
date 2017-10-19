import { last } from 'lodash';

import { getInitialHistoryStateFromLocalStorage } from '../../utils/local-storage/local-storage';
import { setTime } from '../../actions/time/time.actions';

export function bootstrap() {
  return (dispatch) => {
    const history = getInitialHistoryStateFromLocalStorage();
    dispatch(setTime(last(history.time)));
  };
}
