import * as types from '../../constants/action-types';
import reducer from './history.reducer';

const initialState = {
  time: [0],
  timers: [],
};

describe('history reducer', () => {
  it('should exist', () => {
    expect(reducer).toBeDefined();
  });

  describe('when localStorageData does not exist', () => {
    it('should have the correct initialState', () => {
      expect(reducer(undefined || undefined, {})).toEqual(initialState);
    });
  });

  describe('when localStorageData does exist', () => {
    it('should have the correct initialState', () => {
      expect(reducer({ time: [1] } || undefined, {})).toEqual({ time: [1] });
    });
  });

  describe('in the inital state', () => {
    it('should handle UPDATE_TIME_HISTORY', () => {
      expect(reducer(initialState, {
        type: types.UPDATE_TIME_HISTORY,
        ms: 1000,
      })).toEqual({
        time: [0, 1000],
        timers: [],
      });
    });

    it('should handle UNDO_UPDATE_TIME_HISTORY', () => {
      expect(reducer(initialState, {
        type: types.UNDO_UPDATE_TIME_HISTORY,
      })).toEqual({
        time: [0],
        timers: [],
      });
    });

    it('should handle RESET_TIME_HISTORY', () => {
      expect(reducer(initialState, {
        type: types.RESET_TIME_HISTORY,
        ms: 1000,
      })).toEqual({
        time: [1000],
        timers: [],
      });
    });
  });

  describe('when state exists', () => {
    it('should handle UPDATE_TIME_HISTORY', () => {
      expect(reducer({ time: [0, 1, 2], timers: [] }, {
        type: types.UPDATE_TIME_HISTORY,
        ms: 1000,
      })).toEqual({
        time: [0, 1, 2, 1000],
        timers: [],
      });
    });

    it('should handle UNDO_UPDATE_TIME_HISTORY', () => {
      expect(reducer({ time: [0, 1, 2], timers: [] }, {
        type: types.UNDO_UPDATE_TIME_HISTORY,
      })).toEqual({
        time: [0, 1],
        timers: [],
      });
    });

    it('should handle RESET_TIME_HISTORY', () => {
      expect(reducer({ time: [0, 1, 2], timers: [] }, {
        type: types.RESET_TIME_HISTORY,
        ms: 1000,
      })).toEqual({
        time: [1000],
        timers: [],
      });
    });

    it('should handle ADD_TIMER', () => {
      expect(
        reducer({ time: [0, 1, 2], timers: [] }, {
          type: types.ADD_TIMER,
          timer: { ms: 1, text: 'foo' },
          ms: 2,
        }),
      ).toEqual({
        time: [0, 1, 2],
        timers: [{ ms: 1, text: 'foo' }],
      });
    });
  });
});
