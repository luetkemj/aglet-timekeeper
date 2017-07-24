import React from 'react';
import { render } from 'react-dom';
import TimeKeeper from './time-keeper.component';
import { buildTimeUI, phaseOfMoon } from './time-keeper.component/utils';

const timeUI = buildTimeUI(100000000);

render(
  <div>
    <TimeKeeper
      day={timeUI.days}
      time={{
        hours: timeUI.hours,
        minutes: timeUI.minutes,
        seconds: timeUI.seconds,
      }}
      sky={timeUI.sky}
      rotation={timeUI.rotation}
      increment={() => {}}
      initialMs={timeUI.ms}
      phaseOfMoon={phaseOfMoon(timeUI.days, timeUI.hours)}
    />
  </div>,
  document.getElementById('root'),
);

