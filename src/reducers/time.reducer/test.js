import {
  UPDATE_TIME,
} from '../../constants/action-types';
import reducer from './index';

const initialState = {
  ms: 0,
  days: 1,
  hours: '12',
  minutes: '00',
  seconds: '00',
  sky: 'night',
  rotation: -540,
  militaryTime: false,
};

const existingState = {
  ms: 1000,
  days: 1,
  hours: '12',
  minutes: '00',
  seconds: '01',
  sky: 'night',
  rotation: -540,
  militaryTime: false,
};

describe('time reducer', () => {
  it('should have the correct initialState when localStorage is empty', () => {
    expect(reducer(undefined || undefined, {})).toEqual(initialState);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('should have the correct initialState when localStorage is full', () => {
    expect(reducer(existingState || undefined, {})).toEqual(existingState);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  describe('in the inital state', () => {
    it('should handle UPDATE_TIME', () => {
      expect(
        reducer(initialState, {
          type: UPDATE_TIME,
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
        militaryTime: false,
      });
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('in an existing state', () => {
    it('should handle UPDATE_TIME', () => {
      expect(
        reducer(existingState, {
          type: UPDATE_TIME,
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
        militaryTime: false,
      });
    });
  });
});
