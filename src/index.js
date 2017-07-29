import React, { Component } from 'react';
import { render } from 'react-dom';
import TimeKeeper from './time-keeper.component';
import { buildTimeUI, phaseOfMoon } from './time-keeper.component/utils';

class AppContainer extends Component {
  state = {
    time: 0,
  }

  timeUI = buildTimeUI(this.state.time);

  increment = (milliseconds) => {
    const updatedTime = this.state.time + milliseconds;

    this.setState({
      time: updatedTime,
    });

    this.timeUI = buildTimeUI(updatedTime);
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
