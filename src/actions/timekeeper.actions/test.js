import {
  INCREMENT_TIME,
  DECREMENT_TIME,
} from '../../constants/action-types';
import * as actions from './index';

describe('timeKeeper actions', () => {
  describe('incrementTime', () => {
    it('should work', () => {
      expect(actions.incrementTime(200)).toEqual({
        type: INCREMENT_TIME,
        ms: 200,
      });
    });
  });

  describe('decrementTime', () => {
    it('should work', () => {
      expect(actions.decrementTime(200)).toEqual({
        type: DECREMENT_TIME,
        ms: 200,
      });
    });
  });
});
