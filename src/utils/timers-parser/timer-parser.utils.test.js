import * as utils from './timers-parser.utils';

describe('utils', () => {
  it('should exist', () => {
    expect(utils).toBeDefined();
  });

  describe('getMacro', () => {
    describe('when macro exists in string', () => {
      it('shoud return macro', () => {
        expect(utils.getMacro('1d3H: foo')).toBe('1d3H:');
      });
    });
    describe('when macro does not exists in string', () => {
      it('should throw', () => {
        expect(() => utils.getMacro('foo'))
          .toThrow('Timers must begin with a single [unit][duration] macro like "1h:"');
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
      it('should throw', () => {
        expect(() => utils.getPairsFromMacro('foo'))
          .toThrow('No [unit][duration] pairs found in macro: "foo"');
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
      it('should throw', () => {
        expect(() => utils.getUnitFromPair('foo'))
          .toThrow('Invalid macro expected [unit][duration] got "foo"');
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
      it('should throw', () => {
        expect(() => utils.getDurationFromPair('25'))
          .toThrow('Invalid macro expected [unit][duration] got "25"');
      });
    });
  });

  describe('isValidUnit', () => {
    it('should return true when unit is valid', () => {
      expect(utils.isValidUnit('s')).toBe(true);
    });

    it('should throw when unit null', () => {
      expect(() => utils.isValidUnit())
        .toThrow('Unit must exist');
    });

    it('should throw when unit is invalid', () => {
      expect(() => utils.isValidUnit('z'))
        .toThrow('Unit "z" is not valid. Expected unit to be one of [s, m, h, d, y]');
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
