import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  incrementTime,
  decrementTime,
} from '../actions/timekeeper.actions';
import IncrementButton from '../increment-button.component';
import Sundial from '../sundial.component';
import { getPhaseOfMoon } from '../utils';
import style from './style.scss';

class AppContainer extends Component {
  increment = (milliseconds) => {
    const updatedMS = this.props.timeState.ms + milliseconds;
    this.props.incrementTime(updatedMS);
  }

  render() {
    const timeKeeperClasses = style.timeKeeper;

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
        <div className={style.dayCount}>DAY {this.props.timeState.days}</div>
        <Sundial
          phaseOfMoon={getPhaseOfMoon(this.props.timeState.days, this.props.timeState.hours)}
          sky={this.props.timeState.sky}
          rotation={this.props.timeState.rotation}
        />
        <div className={style.time}>
          {this.props.timeState.hours}
          <span className={style.colon}>:</span>
          {this.props.timeState.minutes}
          <span className={style.colon}>:</span>
          {this.props.timeState.seconds}
        </div>

        <div className={style.controls}>
          {buttons.map(button => (
            <IncrementButton
              key={`${button.unit}-${button.duration}`}
              increment={this.increment}
              initialMs={this.props.timeState.ms}
              duration={button.duration}
              unit={button.unit}
            />))}
        </div>
      </div>
    );
  }
}

AppContainer.propTypes = {
  incrementTime: PropTypes.func.isRequired,
  timeState: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  timeState: state.timeState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  incrementTime,
  decrementTime,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
