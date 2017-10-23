// @flow

import { cloneDeep, sortedIndexBy } from 'lodash';

export function createNewTimer(timer: {
  ms: number,
  text: string,
}, ms: number) {
  const newTimer = cloneDeep(timer);
  newTimer.ms = timer.ms + ms;

  return newTimer;
}

export function insertTimer(timers: [
  {
    ms: number,
    text: string,
  },
], timer: {
  ms: number,
  text: string,
}) {
  // find index to insert new timer
  const index = sortedIndexBy(timers, timer, 'ms');

  return [
    ...timers.slice(0, index),
    timer,
    ...timers.slice(index),
  ];
}
