import {
  ADD_TIMER,
  REMOVE_TIMER,
  UPDATE_TIMERS,
} from '../../constants/action-types';
import reducer from './timers.reducer';

const initialState = {
  timers: [],
  active: [],
  expired: [],
  recentlyExpired: [],
  error: null,
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
          ms: 0,
        }),
      ).toEqual({
        timers: [{ ms: 1, text: 'foo' }],
        active: [],
        expired: [],
        recentlyExpired: [],
        error: null,
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
          recentlyExpired: [],
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
        active: [],
        expired: [],
        recentlyExpired: [],
        error: null,
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
          recentlyExpired: [],
          error: null,
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
        recentlyExpired: [],
        error: null,
      });
    });
  });

  describe('update timers', () => {
    it('should work when there are multiple active timers', () => {
      expect(
        reducer({
          timers: [
            { ms: 1, text: 'foo' },
            { ms: 2, text: 'baz' },
            { ms: 3, text: 'bar' },
          ],
          active: [
            { ms: 1, text: 'foo' },
            { ms: 2, text: 'baz' },
          ],
          expired: [
            { ms: 3, text: 'bar' },
          ],
          recentlyExpired: [],
          error: null,
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
          { ms: 2, text: 'baz' },
          { ms: 1, text: 'foo' },
        ],
        recentlyExpired: [],
        error: null,
      });
    });

    it('should work when there is only one active timer', () => {
      expect(
        reducer({
          timers: [
            { ms: 1, text: 'foo' },
            { ms: 2, text: 'baz' },
            { ms: 3, text: 'bar' },
          ],
          active: [
            { ms: 1, text: 'foo' },
          ],
          expired: [
            { ms: 3, text: 'bar' },
            { ms: 2, text: 'baz' },
          ],
          recentlyExpired: [],
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
          { ms: 2, text: 'baz' },
          { ms: 1, text: 'foo' },
        ],
        recentlyExpired: [],
      });
    });

    it('should work when there is no active timer', () => {
      expect(
        reducer({
          timers: [
            { ms: 1, text: 'foo' },
            { ms: 2, text: 'baz' },
            { ms: 3, text: 'bar' },
          ],
          active: [],
          expired: [
            { ms: 3, text: 'bar' },
            { ms: 2, text: 'baz' },
            { ms: 1, text: 'foo' },
          ],
          recentlyExpired: [],
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
          { ms: 2, text: 'baz' },
          { ms: 1, text: 'foo' },
        ],
        recentlyExpired: [],
      });
    });


    it('should add recently expired timers to recentlyExpired', () => {
      expect(
        reducer({
          timers: [
            { ms: 1, text: 'foo' },
            { ms: 2, text: 'baz' },
            { ms: 3, text: 'bar' },
            { ms: 4, text: 'bar' },
          ],
          active: [],
          expired: [
            { ms: 1, text: 'foo' },
          ],
          recentlyExpired: [],
        }, {
          type: UPDATE_TIMERS,
          ms: 3,
          lastMs: 1,
        }),
      ).toEqual({
        timers: [
          { ms: 1, text: 'foo' },
          { ms: 2, text: 'baz' },
          { ms: 3, text: 'bar' },
          { ms: 4, text: 'bar' },
        ],
        active: [
          { ms: 4, text: 'bar' },
        ],
        expired: [
          { ms: 3, text: 'bar' },
          { ms: 2, text: 'baz' },
          { ms: 1, text: 'foo' },
        ],
        recentlyExpired: [
          { ms: 3, text: 'bar' },
          { ms: 2, text: 'baz' },
        ],
      });
    });

    it('should clear recently expired when no new timers expire', () => {
      expect(
        reducer({
          timers: [
            { ms: 2, text: 'foo' },
            { ms: 5, text: 'baz' },
          ],
          active: [
            { ms: 5, text: 'baz' },
          ],
          expired: [
            { ms: 2, text: 'foo' },
          ],
          recentlyExpired: [
            { ms: 2, text: 'foo' },
          ],
        }, {
          type: UPDATE_TIMERS,
          ms: 4,
          lastMs: 3,
        }),
      ).toEqual({
        timers: [
          { ms: 2, text: 'foo' },
          { ms: 5, text: 'baz' },
        ],
        active: [
          { ms: 5, text: 'baz' },
        ],
        expired: [
          { ms: 2, text: 'foo' },
        ],
        recentlyExpired: [],
      });
    });
  });
});
