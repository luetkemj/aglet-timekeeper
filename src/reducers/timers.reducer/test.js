import {
  ADD_TIMER,
  REMOVE_TIMER,
} from '../../constants/action-types';
import reducer from './index';

const initialState = {
  timers: [],
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
        }),
      ).toEqual({
        timers: [{ ms: 1, text: 'foo' }],
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
        }, {
          type: ADD_TIMER,
          timer: { ms: 2, text: 'baz' },
        }),
      ).toEqual({
        timers: [
          { ms: 1, text: 'foo' },
          { ms: 2, text: 'baz' },
          { ms: 3, text: 'bar' },
        ],
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
        }, {
          type: REMOVE_TIMER,
          index: 1,
        }),
      ).toEqual({
        timers: [
          { ms: 1, text: 'foo' },
          { ms: 3, text: 'bar' },
        ],
      });
    });
  });
});
