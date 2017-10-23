import * as timersUtils from './timers.utils';

describe('timers utils', () => {
  it('should exist', () => {
    expect(timersUtils).toBeDefined();
  });

  describe('createNewTimer', () => {
    it('should work', () => {
      expect(timersUtils.createNewTimer({ ms: 1, text: 'foo' }, 2)).toEqual({
        ms: 3,
        text: 'foo',
      });
    });
  });

  describe('insertTimer', () => {
    it('should work when there are no existing timers', () => {
      expect(timersUtils.insertTimer([], { ms: 1, text: 'foo' })).toEqual([
        { ms: 1, text: 'foo' },
      ]);
    });

    it('should work when there are existing timers', () => {
      expect(timersUtils.insertTimer([
        { ms: 1, text: 'foo' },
        { ms: 3, text: 'foo' },
      ],
      { ms: 2, text: 'foo' },
      )).toEqual([
        { ms: 1, text: 'foo' },
        { ms: 2, text: 'foo' },
        { ms: 3, text: 'foo' },
      ]);
    });
  });
});
