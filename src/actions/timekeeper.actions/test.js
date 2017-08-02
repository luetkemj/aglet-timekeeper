import {
  UPDATE_TIME,
} from '../../constants/action-types';
import * as actions from './index';

describe('timeKeeper actions', () => {
  describe('updateTime', () => {
    it('should work', () => {
      expect(actions.updateTime(1000)).toEqual({
        type: UPDATE_TIME,
        timeUI: {
          ms: 1000,
          days: 1,
          hours: '00',
          minutes: '00',
          seconds: '01',
          sky: 'night',
          rotation: -540,
        },
      });
    });
  });
});
