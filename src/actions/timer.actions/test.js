import {
  ADD_TIMER,
  REMOVE_TIMER,
} from '../../constants/action-types';
import * as actions from './index';

describe('timer actions', () => {
  describe('addTimer', () => {
    it('should work', () => {
      expect(actions.addTimer({ foo: 1 })).toEqual({
        type: ADD_TIMER,
        timer: { foo: 1 },
      });
    });
  });

  describe('remove timer', () => {
    it('should work', () => {
      expect(actions.removeTimer(1)).toEqual({
        type: REMOVE_TIMER,
        index: 1,
      });
    });
  });
});
