// @flow

import moment from 'moment';

export function getSky(hoursN: number): string {
  // set the sky colors per time of day
  let sky = '';
  if (hoursN === 6) {
    sky = 'dawn';
  } else if (hoursN === 18) {
    sky = 'dusk';
  } else if (hoursN < 6 || hoursN > 18) {
    sky = 'night';
  } else if (hoursN > 6 && hoursN < 18) {
    sky = 'day';
  }

  return sky;
}

export function getRotation(days: number, hoursN: number, minutesN: number): number {
  // set the rotation of the sun and moon
  const rotation =
  // get the rotation based on total number of days
  ((days) * -360) +
  // get the rotation based on total number of hours minus half a day
  // to get the sun and moon in the right spot
  ((hoursN * -15) - 180) +
  // get the little bit of rotation from minutes cause the maths are even enough?
  (minutesN * -0.25);

  return rotation;
}

export function getPhaseOfMoon(day: number, hours: number): number {
  // day is 0 based so we need to add 1 because our phases of the moon are 1 based
  const dayN = parseInt(day, 10) + 1;
  const hoursN = parseInt(hours, 10);

  if (dayN < 29) {
    if (hoursN > 12) {
      return dayN + 1;
    }
    return dayN;
  }

  if (hoursN > 12) {
    return (dayN % 28) + 1;
  }

  return dayN % 28;
}

export function buildTimeUI(ms: number): {
    ms: number,
    days: number,
    hours: string,
    minutes: string,
    seconds: string,
    sky: string,
    rotation: number,
  } {
  const myMoment = moment.utc(ms);

  // get days from start of time
  const days = Math.floor(moment.duration(ms).asDays()) + 1;
  const hours = myMoment.format('h');
  const minutes = myMoment.format('mm');
  const seconds = myMoment.format('ss');

  const daysN = parseInt(myMoment.format('DD'), 10);
  const hoursN = parseInt(myMoment.format('HH'), 10);
  const minutesN = parseInt(minutes, 10);

  const sky = getSky(hoursN);
  const rotation = getRotation(daysN, hoursN, minutesN);

  return {
    ms,
    days,
    hours,
    minutes,
    seconds,
    sky,
    rotation,
  };
}

// PARSER
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
