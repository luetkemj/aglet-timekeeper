import * as utils from '.';

describe('utils', () => {
  it('should exist', () => {
    expect(utils).toBeDefined();
  });

  describe('parser', () => {
    it('should work', () => {
      expect(utils.parser('6s')).toEqual([{
        unit: 'seconds',
        duration: 6,
      }]);
    });
  });

  describe('compareKeys', () => {
    it('compareKeys unmatching keys correctly', () => {
      expect(utils.compareKeys({ a: 1, b: 2 }, { a: 3, b: 1, c: 2 })).toBe(false);
    });

    it('compareKeys matching keys correctly', () => {
      expect(utils.compareKeys({ a: 1, b: 2, c: 3 }, { a: 3, b: 1, c: 2 })).toBe(true);
    });
  });

  describe('getSky', () => {
    it('should return the dawn sky correctly', () => {
      expect(utils.getSky(6)).toBe('dawn');
    });
    it('should return the dusk sky correctly', () => {
      expect(utils.getSky(18)).toBe('dusk');
    });
    it('should return the night sky correctly', () => {
      expect(utils.getSky(5)).toBe('night');
      expect(utils.getSky(19)).toBe('night');
    });
    it('should return the day sky correctly', () => {
      expect(utils.getSky(7)).toBe('day');
      expect(utils.getSky(17)).toBe('day');
    });
  });

  describe('getRotation', () => {
    it('should return rotation correctly', () => {
      expect(utils.getRotation(0, 0, 0)).toBe(-180);
      expect(utils.getRotation(1, 0, 0)).toBe(-540);
      expect(utils.getRotation(1, 1, 0)).toBe(-555);
      expect(utils.getRotation(1, 1, 1)).toBe(-555.25);
    });
  });

  describe('getPhaseOfMoon', () => {
    it('should return the the correct phase of the moon', () => {
      expect(utils.getPhaseOfMoon(0, 0)).toBe(1);
      expect(utils.getPhaseOfMoon(0, 13)).toBe(2);

      expect(utils.getPhaseOfMoon(29, 0)).toBe(2);
      expect(utils.getPhaseOfMoon(29, 13)).toBe(3);
    });
  });

  describe('buildTimeUI', () => {
    describe('militaryTime format', () => {
      it('should build the correct UI given 1000ms (1 second)', () => {
        expect(utils.buildTimeUI(1000, true)).toEqual({
          ms: 1000,
          days: 1,
          hours: '00',
          minutes: '00',
          seconds: '01',
          sky: 'night',
          rotation: -540,
        });
      });
      it('should build the correct UI given 21600000ms (6 hours)', () => {
        expect(utils.buildTimeUI(21600000, true)).toEqual({
          ms: 21600000,
          days: 1,
          hours: '06',
          minutes: '00',
          seconds: '00',
          sky: 'dawn',
          rotation: -630,
        });
      });
    });

    describe('standard format', () => {
      it('should build the correct UI given 1000ms (1 second)', () => {
        expect(utils.buildTimeUI(1000)).toEqual({
          ms: 1000,
          days: 1,
          hours: '12',
          minutes: '00',
          seconds: '01',
          sky: 'night',
          rotation: -540,
        });
      });
      it('should build the correct UI given 21600000ms (6 hours)', () => {
        expect(utils.buildTimeUI(21600000)).toEqual({
          ms: 21600000,
          days: 1,
          hours: '6',
          minutes: '00',
          seconds: '00',
          sky: 'dawn',
          rotation: -630,
        });
      });
    });
  });
});
