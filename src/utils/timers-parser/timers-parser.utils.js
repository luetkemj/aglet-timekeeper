// @flow

export function getMacro(timer: string): ?string {
  const matches = timer.match(/^(?:\d*\.)?\d\w+:/gi);

  if (matches) {
    return matches[0];
  }

  return null;
}

export function getText(timer: string, macro: string): string {
  return timer.replace(macro, '').trim();
}

export function getPairsFromMacro(macro: string) {
  const matches = macro.match(/(-*[0-9]+[a-z]{1})/gi);

  if (matches) {
    return matches;
  }

  return null;
}

export function isValidUnit(unit: string): boolean {
  const validUnits = ['s', 'm', 'h', 'd', 'y'];

  return validUnits.includes(unit.toLowerCase());
}

export function getUnitFromPair(pair: string): ?string {
  // make sure that pair is valid
  if (!pair.match(/(-*[0-9]+[a-z]{1})/gi)) {
    return null;
  }

  // pair is valid, find unit
  const matches = pair.match(/([a-z]{1})/i);

  // return unit if it exists and is valid
  if (matches) {
    if (matches[0] && isValidUnit(matches[0])) {
      return matches[0];
    }
  }

  return null;
}

export function getDurationFromPair(pair: string): ?number {
  // make sure that pair is valid
  if (!pair.match(/(-*[0-9]+[a-z]{1})/gi)) {
    return null;
  }

  // pair is valid, find number
  const matches = pair.match(/([0-9]+)/g);

  // return duration if it exists
  if (matches) {
    return parseInt(matches[0], 10);
  }

  return null;
}

export function getMsFromPair(pair: string): ?number {
  const dict = {
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000,
    y: 31557600000,
  };

  const unit = getUnitFromPair(pair);
  if (!unit || !isValidUnit(unit)) {
    return null;
  }

  const duration = getDurationFromPair(pair);
  if (!duration) {
    return null;
  }

  return duration * dict[unit];
}

export function parseTimer(timer: string): ?{
    ms: number,
    text: string,
  } {
  const macro = getMacro(timer);
  if (!macro) { return null; }

  const pairs = getPairsFromMacro(macro);
  if (!pairs) { return null; }

  const text = getText(timer, macro);
  if (!text) { return null; }

  const ms = pairs.reduce((sum, pair) => sum + getMsFromPair(pair), 0);

  return {
    ms,
    text,
  };
}
