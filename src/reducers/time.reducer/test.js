import {
  ADD_BUTTON,
  REMOVE_BUTTONS,
  RESET_TIME,
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
  buttons: [{
    unit: 'seconds',
    duration: 6,
  },
  {
    unit: 'minutes',
    duration: 5,
  },
  {
    unit: 'minutes',
    duration: 10,
  },
  {
    unit: 'hours',
    duration: 1,
  },
  {
    unit: 'hours',
    duration: 8,
  }],
};

const existingState = {
  ms: 1000,
  days: 1,
  hours: '00',
  minutes: '00',
  seconds: '01',
  sky: 'night',
  rotation: -540,
  militaryTime: true,
  buttons: [{
    unit: 'seconds',
    duration: 6,
  },
  {
    unit: 'minutes',
    duration: 5,
  },
  {
    unit: 'minutes',
    duration: 10,
  },
  {
    unit: 'hours',
    duration: 1,
  },
  {
    unit: 'hours',
    duration: 8,
  }],
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
        buttons: [{
          unit: 'seconds',
          duration: 6,
        },
        {
          unit: 'minutes',
          duration: 5,
        },
        {
          unit: 'minutes',
          duration: 10,
        },
        {
          unit: 'hours',
          duration: 1,
        },
        {
          unit: 'hours',
          duration: 8,
        }],
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
        hours: '00',
        minutes: '00',
        seconds: '02',
        sky: 'night',
        rotation: -540,
        militaryTime: true,
        buttons: [{
          unit: 'seconds',
          duration: 6,
        },
        {
          unit: 'minutes',
          duration: 5,
        },
        {
          unit: 'minutes',
          duration: 10,
        },
        {
          unit: 'hours',
          duration: 1,
        },
        {
          unit: 'hours',
          duration: 8,
        }],
      });
    });

    it('should handle RESET_TIME', () => {
      expect(
        reducer(existingState, {
          type: RESET_TIME,
          ms: 2000,
        }),
      ).toEqual({
        ms: 0,
        days: 1,
        hours: '00',
        minutes: '00',
        seconds: '00',
        sky: 'night',
        rotation: -540,
        militaryTime: true,
        buttons: [{
          unit: 'seconds',
          duration: 6,
        },
        {
          unit: 'minutes',
          duration: 5,
        },
        {
          unit: 'minutes',
          duration: 10,
        },
        {
          unit: 'hours',
          duration: 1,
        },
        {
          unit: 'hours',
          duration: 8,
        }],
      });
    });

    it('should handle REMOVE_BUTTONS', () => {
      expect(
        reducer(existingState, {
          type: REMOVE_BUTTONS,
          buttons: [0, 2],
        }),
      ).toEqual({
        ms: 1000,
        days: 1,
        hours: '00',
        minutes: '00',
        seconds: '01',
        sky: 'night',
        rotation: -540,
        militaryTime: true,
        buttons: [{
          unit: 'minutes',
          duration: 5,
        },
        {
          unit: 'hours',
          duration: 1,
        },
        {
          unit: 'hours',
          duration: 8,
        }],
      });
    });

    it('should handle ADD_BUTTON', () => {
      expect(
        reducer(existingState, {
          type: ADD_BUTTON,
          button: {
            unit: 'minutes',
            duration: 7,
          },
        }),
      ).toEqual({
        ms: 1000,
        days: 1,
        hours: '00',
        minutes: '00',
        seconds: '01',
        sky: 'night',
        rotation: -540,
        militaryTime: true,
        buttons: [{
          unit: 'seconds',
          duration: 6,
        },
        {
          unit: 'minutes',
          duration: 5,
        },
        {
          unit: 'minutes',
          duration: 7,
        },
        {
          unit: 'minutes',
          duration: 10,
        },
        {
          unit: 'hours',
          duration: 1,
        },
        {
          unit: 'hours',
          duration: 8,
        }],
      });
    });
  });
});
