import * as utils from '.';

describe('utils', () => {
  it('should exist', () => {
    expect(utils).toBeDefined();
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


  describe('getMacro', () => {
    describe('when macro exists in string', () => {
      it('shoud return macro', () => {
        expect(utils.getMacro('1d3H: foo')).toBe('1d3H:');
      });
    });
    describe('when macro does not exists in string', () => {
      it('should return null', () => {
        expect(utils.getMacro('foo')).toBe(null);
      });
    });
  });

  describe('getText', () => {
    describe('when text exists', () => {
      it('shoud work', () => {
        expect(utils.getText('1d3H: foo', '1d3H:')).toBe('foo');
      });
    });
  });

  describe('getPairsFromMacro', () => {
    describe('when pairs exist in macro', () => {
      it('shoud return pairs', () => {
        expect(utils.getPairsFromMacro('1d3H: foo')).toEqual(['1d', '3H']);
      });
    });
    describe('when pairs do not exists in macro', () => {
      it('should return null', () => {
        expect(utils.getPairsFromMacro('foo')).toBe(null);
      });
    });
  });

  describe('getUnitFromPair', () => {
    describe('when unit exists in pair', () => {
      it('shoud return unit', () => {
        expect(utils.getUnitFromPair('1d')).toEqual('d');
      });
    });
    describe('when unit does not exist in pair', () => {
      it('should return null', () => {
        expect(utils.getUnitFromPair('foo')).toBe(null);
      });
    });
  });

  describe('getDurationFromPair', () => {
    describe('when duration exists in pair', () => {
      it('should return duration', () => {
        expect(utils.getDurationFromPair('1d')).toEqual(1);
      });
    });
    describe('when multi-digit duration exists in pair', () => {
      it('should return duration', () => {
        expect(utils.getDurationFromPair('333d')).toEqual(333);
      });
    });
    describe('when duration does not exist in pair', () => {
      it('should return null', () => {
        expect(utils.getDurationFromPair('25')).toBe(null);
      });
    });
  });

  describe('isValidUnit', () => {
    it('should return true when unit is valid', () => {
      expect(utils.isValidUnit('s')).toBe(true);
    });

    it('should return false when unit is invalid', () => {
      expect(utils.isValidUnit('z')).toBe(false);
    });
  });

  describe('getMsFromPair', () => {
    it('should work with seconds', () => {
      expect(utils.getMsFromPair('1s')).toBe(1000);
    });
    it('should work with minutes', () => {
      expect(utils.getMsFromPair('1m')).toBe(60000);
    });
    it('should work with hours', () => {
      expect(utils.getMsFromPair('1h')).toBe(3600000);
    });
    it('should work with days', () => {
      expect(utils.getMsFromPair('1d')).toBe(86400000);
    });
    it('should work with years', () => {
      expect(utils.getMsFromPair('1y')).toBe(31557600000);
    });
    it('should return null if given an invalid pair', () => {
      expect(utils.getMsFromPair('1foo')).toBe(null);
    });
  });

  describe('parseTimer', () => {
    it('should work', () => {
      expect(utils.parseTimer('1m1s: foo')).toEqual({ ms: 61000, text: 'foo' });
    });
    it('should work with seconds', () => {
      expect(utils.parseTimer('333333s: foo')).toEqual({ ms: 333333000, text: 'foo' });
    });
  });
});
