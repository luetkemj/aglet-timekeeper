import * as utils from './local-storage';

describe('localStorage utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exist', () => {
    expect(utils).toBeDefined();
  });

  describe('parseLocalStorageData', () => {
    describe('when local storage is valid', () => {
      it('should work', () => {
        expect(utils.parseLocalStorageData('{}')).toEqual({});
      });
    });

    describe('when local storage is invalid', () => {
      it('should work', () => {
        expect(() => utils.parseLocalStorageData('}')).toThrow();
      });
    });

    describe('when localStorage is valid but contains something other than an object', () => {
      beforeEach(() => {
        localStorage.setItem('agletTimekeeper', JSON.stringify(23));
      });

      it('should throw', () => {
        expect(() => utils.parseLocalStorageData('3')).toThrow();
      });
    });
  });

  describe('updateLocalStorage', () => {
    describe(('when given something other than an object'), () => {
      it('should throw correctly', () => {
        const error = "updateLocalStorage expects the first argument to be typeof 'object', received string";
        expect(() => utils.updateLocalStorage('string')).toThrow(error);
      });
    });

    describe('when localStorage is empty', () => {
      beforeEach(() => {
        localStorage.setItem('agletTimekeeper', null);
      });
      it('should work', () => {
        utils.updateLocalStorage({ foo: 'baz' });
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'agletTimekeeper', JSON.stringify({ foo: 'baz' }),
        );
      });
    });

    describe('when localStorage is not empty', () => {
      beforeEach(() => {
        localStorage.setItem('agletTimekeeper', JSON.stringify({ foo: 'bar', fizz: 'buzz' }));
      });

      it('should work when given an object', () => {
        utils.updateLocalStorage({ foo: 'baz' });

        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'agletTimekeeper', JSON.stringify({ foo: 'baz', fizz: 'buzz' }),
        );
      });
    });
  });

  describe('getInitialHistoryStateFromLocalStorage', () => {
    describe('when legacy data structure exists', () => {
      beforeEach(() => {
        localStorage.setItem('agletTimekeeper', JSON.stringify({ history: [0] }));
      });

      it('should work', () => {
        expect(utils.getInitialHistoryStateFromLocalStorage()).toEqual({
          time: [0],
        });
      });
    });

    describe('when correct data structure exists', () => {
      beforeEach(() => {
        localStorage.setItem('agletTimekeeper', JSON.stringify({ history: { time: [1] } }));
      });

      it('should work', () => {
        expect(utils.getInitialHistoryStateFromLocalStorage()).toEqual({
          time: [1],
        });
      });
    });

    describe('when incorrect data structure exists', () => {
      beforeEach(() => {
        localStorage.setItem('agletTimekeeper', JSON.stringify({ foo: { bar: [1] } }));
      });

      it('should work', () => {
        expect(utils.getInitialHistoryStateFromLocalStorage()).toEqual({ time: [0] });
      });
    });

    describe('when no data structure exists', () => {
      beforeEach(() => {
        localStorage.setItem('agletTimekeeper', null);
      });

      it('should work', () => {
        expect(utils.getInitialHistoryStateFromLocalStorage()).toEqual({ time: [0] });
      });
    });
  });
});
