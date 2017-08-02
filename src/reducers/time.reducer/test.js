import {
  UPDATE_TIME,
} from '../../constants/action-types';
import reducer from './index';

const initialState = {
  ms: 0,
  days: 1,
  hours: '00',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
};

const exisitingState = {
  ms: 1000,
  days: 1,
  hours: '00',
  minutes: '00',
  seconds: '01',
  sky: 'night',
  rotation: -540,
};

describe('time reducer', () => {
  it('should have the correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('in the inital state', () => {
    it('should handle UPDATE_TIME', () => {
      expect(
        reducer(initialState, {
          type: UPDATE_TIME,
          timeUI: {
            ms: 1000,
            days: 1,
            hours: '00',
            minutes: '00',
            seconds: '00',
            sky: 'night',
            rotation: -540,
          },
        }),
      ).toEqual({
        ms: 1000,
        days: 1,
        hours: '00',
        minutes: '00',
        seconds: '00',
        sky: 'night',
        rotation: -540,
      });
    });
  });

  describe('in an existing state', () => {
    it('should handle UPDATE_TIME', () => {
      expect(
        reducer(exisitingState, {
          type: UPDATE_TIME,
          timeUI: {
            ms: 2000,
            days: 1,
            hours: '00',
            minutes: '00',
            seconds: '01',
            sky: 'night',
            rotation: -540,
          },
        }),
      ).toEqual({
        ms: 2000,
        days: 1,
        hours: '00',
        minutes: '00',
        seconds: '01',
        sky: 'night',
        rotation: -540,
      });
    });
  });
});
