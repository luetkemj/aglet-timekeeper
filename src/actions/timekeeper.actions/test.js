import {
  UPDATE_TIME,
  UPDATE_FORMAT,
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

  describe('updateFormat', () => {
    it('should work', () => {
      expect(actions.updateFormat(true)).toEqual({
        type: UPDATE_FORMAT,
        format: true,
      });
    });
  });
});
