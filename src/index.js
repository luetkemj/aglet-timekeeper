import React, { Component } from 'react';
import { render } from 'react-dom';
import IncrementButton from './increment-button.component';
import Sundial from './sundial.component';
import { buildTimeUI, getPhaseOfMoon } from './utils';
import style from './style.scss';

class AppContainer extends Component {
  state = {
    time: 0,
    mounted: false,
    timerId: setTimeout(() => {
      this.setState({
        mounted: true,
      });
    }, 300),
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerId);
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
    let timeKeeperClasses = style.timeKeeper;
    if (this.state.mounted) {
      timeKeeperClasses += ` ${style.hasMounted}`;
    }

    const buttons = [
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
    ];

    return (
      <div className={timeKeeperClasses}>
        <div className={style.dayCount}>DAY {this.timeUI.days}</div>
        <Sundial
          phaseOfMoon={getPhaseOfMoon(this.timeUI.days, this.timeUI.hours)}
          sky={this.timeUI.sky}
          rotation={this.timeUI.rotation}
        />
        <div className={style.time}>
          {this.timeUI.hours}
          <span className={style.colon}>:</span>
          {this.timeUI.minutes}
          <span className={style.colon}>:</span>
          {this.timeUI.seconds}
        </div>

        <div className={style.controls}>
          {buttons.map(button => (
            <IncrementButton
              key={`${button.unit}-${button.duration}`}
              increment={this.increment}
              initialMs={this.timeUI.ms}
              duration={button.duration}
              unit={button.unit}
            />))}
        </div>
      </div>
    );
  }
}

render(
  <AppContainer />,
  document.getElementById('root'),
);
