import React from 'react';
import { render } from 'react-dom';
import TimeKeeper from './components/time-keeper.component';

render(
  <div>
    <TimeKeeper
      day={0}
      time={{
        hours: '00',
        minutes: '00',
        seconds: '00',
      }}
      phaseOfMoon={6}
      sky={'night'}
      rotation={10}
      increment={() => {}}
      initialMs={0}
    />
  </div>,
  document.getElementById('root'),
);

