import React, { Component } from 'react';
import { render } from 'react-dom';
import TimeKeeper from './time-keeper.component';
import { buildTimeUI, phaseOfMoon } from './time-keeper.component/utils';

class AppContainer extends Component {
  state = {
    time: 10000,
  }

  timeUI = buildTimeUI(this.state.time);

  increment = (milliseconds) => {
    this.setState({
      time: this.state.time += milliseconds,
    });

    this.timeUI = buildTimeUI(this.state.time);
  }

  render() {
    return (
      <TimeKeeper
        day={Math.floor(this.timeUI.days)}
        time={{
          hours: this.timeUI.hours,
          minutes: this.timeUI.minutes,
          seconds: this.timeUI.seconds,
        }}
        sky={this.timeUI.sky}
        rotation={this.timeUI.rotation}
        increment={this.increment}
        initialMs={this.timeUI.ms}
        phaseOfMoon={phaseOfMoon(this.timeUI.days, this.timeUI.hours)}
        buttons={[
          {
            unit: 'seconds',
            duration: 6,
          },
          {
            unit: 'minutes',
            duration: 30,
          },
          {
            unit: 'hours',
            duration: 6,
          },
          {
            unit: 'days',
            duration: 2,
          },
          {
            unit: 'years',
            duration: 8,
          },
        ]}
      />
    );
  }
}

render(
  <AppContainer />,
  document.getElementById('root'),
);
