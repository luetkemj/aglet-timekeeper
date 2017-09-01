import {
  UNDO_UPDATE_TIME,
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

  describe('undoUpdateTime', () => {
    it('should work', () => {
      expect(actions.undoUpdateTime(1000)).toEqual({
        type: UNDO_UPDATE_TIME,
        ms: 1000,
      });
    });
  });
});
