// @flow

import { timerUnits } from './timers.utils.dict';

export function getMacro(timer: string): ?string {
  const matches = timer.match(/^(?:\d*\.)?\d\w+:/gi);

  if (matches) {
    return matches[0];
  }

  throw new Error('Timers must begin with a single [unit][duration] macro like "1h:"');
}

export function getText(timer: string, macro: string): string {
  const text = timer.replace(macro, '').trim();
  if (!text) {
    throw new Error('Timers must contain a [text] description');
  }

  return text;
}

export function getPairsFromMacro(macro: string) {
  const matches = macro.match(/(-*[0-9]+[a-z]{1})/gi);

  if (matches) {
    return matches;
  }

  throw new Error(`No [unit][duration] pairs found in macro: "${macro}"`);
}

export function isValidUnit(unit: ?string): boolean {
  if (!unit) {
    throw new Error('Unit must exist');
  }

  const validUnits = Object.keys(timerUnits);

  if (validUnits.includes(unit.toLowerCase())) {
    return true;
  }

  throw new Error(`Unit "${unit}" is not valid. Expected unit to be one of [s, m, h, d, y]`);
}

export function getUnitFromPair(pair: string): ?string {
  // make sure that pair is valid
  if (!pair.match(/(-*[0-9]+[a-z]{1})/gi)) {
    throw new Error(`Invalid macro expected [unit][duration] got "${pair}"`);
  }

  // pair is valid, find unit
  const matches = pair.match(/([a-z]{1})/i);

  // return unit if it exists and is valid
  if (matches) {
    if (matches[0] && isValidUnit(matches[0])) {
      return matches[0];
    }
  }

  throw new Error(`Valid unit not found in ${pair}`);
}

export function getDurationFromPair(pair: string): ?number {
  // make sure that pair is valid
  if (!pair.match(/(-*[0-9]+[a-z]{1})/gi)) {
    throw new Error(`Invalid macro expected [unit][duration] got "${pair}"`);
  }

  // pair is valid, find number
  const matches = pair.match(/([0-9]+)/g);

  // return duration if it exists
  if (matches) {
    return parseInt(matches[0], 10);
  }

  throw new Error(`Valid duration not found in "${pair}"`);
}

export function getMsFromPair(pair: string): ?number {
  const dict = timerUnits;

  const unit = getUnitFromPair(pair);
  // will throw if unit is not valid
  isValidUnit(unit);

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
