import * as types from '../../constants/action-types';
import reducer from './time.reducer';

const initialState = {
  ms: 0,
  days: 1,
  hours: '12',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
};

describe('time reducer', () => {
  it('should exist', () => {
    expect(reducer).toBeDefined();
  });

  it('should have the correct initialState when localStorage is empty', () => {
    expect(reducer(undefined || undefined, {})).toEqual(initialState);
  });

  describe('in the inital state', () => {
    it('should handle UPDATE_TIMEKEEPER', () => {
      expect(
        reducer(initialState, {
          type: types.UPDATE_TIMEKEEPER,
          ms: 1000,
        }),
      ).toEqual({
        ms: 1000,
        days: 1,
        hours: '12',
        minutes: '00',
        seconds: '01',
        sky: 'night',
        rotation: -540,
      });
    });
  });

  describe('in an existing state', () => {
    let state;
    beforeEach(() => {
      state = {
        ms: 1000,
        days: 1,
        hours: '12',
        minutes: '00',
        seconds: '01',
        sky: 'night',
        rotation: -540,
      };
    });
    it('should handle UPDATE_TIMEKEEPER', () => {
      expect(
        reducer(state, {
          type: types.UPDATE_TIMEKEEPER,
          ms: 2000,
        }),
      ).toEqual({
        ms: 2000,
        days: 1,
        hours: '12',
        minutes: '00',
        seconds: '02',
        sky: 'night',
        rotation: -540,
      });
    });
  });
});
