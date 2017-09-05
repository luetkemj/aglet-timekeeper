import {
  ADD_TIMER,
  REMOVE_TIMER,
  UPDATE_TIMERS,
} from '../../constants/action-types';
import reducer from './index';

const initialState = {
  timers: [],
  active: [],
  expired: [],
};

describe('timers reducer', () => {
  it('should have the correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('in the initial state', () => {
    it('should handle ADD_TIMER', () => {
      expect(
        reducer(initialState, {
          type: ADD_TIMER,
          timer: { ms: 1, text: 'foo' },
          ms: 2,
        }),
      ).toEqual({
        timers: [{ ms: 3, text: 'foo' }],
        active: [],
        expired: [],
      });
    });
  });

  describe('when timers exist', () => {
    it('should handle ADD_TIMER', () => {
      expect(
        reducer({
          timers: [
            { ms: 1, text: 'foo' },
            { ms: 3, text: 'bar' },
          ],
          active: [],
          expired: [],
        }, {
          type: ADD_TIMER,
          timer: { ms: 2, text: 'baz' },
          ms: 2,
        }),
      ).toEqual({
        timers: [
          { ms: 1, text: 'foo' },
          { ms: 3, text: 'bar' },
          { ms: 4, text: 'baz' },
        ],
        active: [],
        expired: [],
      });
    });

    it('should handle REMOVE_TIMER', () => {
      expect(
        reducer({
          timers: [
            { ms: 1, text: 'foo' },
            { ms: 2, text: 'baz' },
            { ms: 3, text: 'bar' },
          ],
          active: [],
          expired: [],
        }, {
          type: REMOVE_TIMER,
          index: 1,
        }),
      ).toEqual({
        timers: [
          { ms: 1, text: 'foo' },
          { ms: 3, text: 'bar' },
        ],
        active: [],
        expired: [],
      });
    });
  });

  describe('update timers', () => {
    it('should work', () => {
      expect(
        reducer({
          timers: [
            { ms: 1, text: 'foo' },
            { ms: 2, text: 'baz' },
            { ms: 3, text: 'bar' },
          ],
          active: [],
          expired: [],
        }, {
          type: UPDATE_TIMERS,
          ms: 2,
        }),
      ).toEqual({
        timers: [
          { ms: 1, text: 'foo' },
          { ms: 2, text: 'baz' },
          { ms: 3, text: 'bar' },
        ],
        active: [
          { ms: 3, text: 'bar' },
        ],
        expired: [
          { ms: 1, text: 'foo' },
          { ms: 2, text: 'baz' },
        ],
      });
    });
  });
});
