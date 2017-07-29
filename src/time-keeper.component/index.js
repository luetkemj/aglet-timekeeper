import React, { PropTypes, Component } from 'react';
import IncrementButton from '../increment-button.component';
import Sundial from '../sundial.component';

import style from './style.scss';

export default class TimeKeeper extends Component {
  state = {
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

  render() {
    let timeKeeperClasses = style.timeKeeper;
    if (this.state.mounted) {
      timeKeeperClasses += ` ${style.hasMounted}`;
    }

    const { day, time, sky, rotation, phaseOfMoon, buttons } = this.props;

    return (
      <div className={timeKeeperClasses}>
        <div className={style.dayCount}>DAY {day}</div>
        <Sundial
          phaseOfMoon={phaseOfMoon}
          sky={sky}
          rotation={rotation}
        />
        <div className={style.time}>
          {time.hours}
          <span className={style.colon}>:</span>
          {time.minutes}
          <span className={style.colon}>:</span>
          {time.seconds}
        </div>

        <div className={style.controls}>
          {buttons.map(button => (
            <IncrementButton
              key={`${button.unit}-${button.duration}`}
              increment={this.props.increment}
              initialMs={this.props.initialMs}
              duration={button.duration}
              unit={button.unit}
            />))}
        </div>
      </div>
    );
  }
}

TimeKeeper.propTypes = {
  day: PropTypes.number.isRequired,
  time: PropTypes.shape({
    hours: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired,
    seconds: PropTypes.string.isRequired,
  }).isRequired,
  phaseOfMoon: PropTypes.number.isRequired,
  sky: PropTypes.string.isRequired,
  rotation: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  initialMs: PropTypes.number.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
