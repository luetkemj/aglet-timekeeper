import {
  INCREMENT_TIME,
  DECREMENT_TIME,
} from '../../constants/action-types';
import reducer from './index';

const initialState = {
  time: 0,
};

const exisitingState = {
  time: 1000,
};

describe('time reducer', () => {
  it('should have the correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('in the inital state', () => {
    it('should handle INCREMENT_TIME', () => {
      expect(
        reducer(initialState, {
          type: INCREMENT_TIME,
          ms: 200,
        }),
      ).toEqual({
        time: 200,
      });
    });

    it('should handle DECREMENT_TIME', () => {
      expect(
        reducer(initialState, {
          type: DECREMENT_TIME,
          ms: 200,
        }),
      ).toEqual({
        time: 0,
      });
    });
  });

  describe('in an existing state', () => {
    it('should handle INCREMENT_TIME', () => {
      expect(
        reducer(exisitingState, {
          type: INCREMENT_TIME,
          ms: 200,
        }),
      ).toEqual({
        time: 1200,
      });
    });

    it('should handle DECREMENT_TIME', () => {
      expect(
        reducer(exisitingState, {
          type: DECREMENT_TIME,
          ms: 200,
        }),
      ).toEqual({
        time: 800,
      });
    });
  });
});
