import {
  UPDATE_TIME,
  UPDATE_FORMAT,
  RESET_TIME,
} from '../../constants/action-types';
import * as actions from './index';

describe('timeKeeper actions', () => {
  describe('resetTime', () => {
    it('should work', () => {
      expect(actions.resetTime(1000)).toEqual({
        type: RESET_TIME,
      });
    });
  });

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
