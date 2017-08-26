import {
  UNDO,
  UPDATE_TIME,
} from '../../constants/action-types';
import * as actions from './index';

describe('timeKeeper actions', () => {
  describe('updateTime', () => {
    it('should work', () => {
      expect(actions.updateTime(1000)).toEqual({
        type: UPDATE_TIME,
        ms: 1000,
      });
    });
  });

  describe('undo', () => {
    it('should work', () => {
      expect(actions.undo(1000)).toEqual({
        type: UNDO,
        ms: 1000,
      });
    });
  });
});
