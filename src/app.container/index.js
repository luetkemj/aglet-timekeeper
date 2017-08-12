import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from '@aglet/components';

import { updateFormat, updateTime } from '../actions/timekeeper.actions';
import IncrementButton from '../increment-button.component';
import Sundial from '../sundial.component';
import Controls from '../controls.component';
import { getPhaseOfMoon } from '../utils';
import style from './style.scss';

class AppContainer extends Component {
  setFormat12 = () => this.props.updateFormat(false);
  setFormat24 = () => this.props.updateFormat(true);

  resetTime = () => this.props.updateTime(0);

  decrement = (milliseconds) => {
    const updatedMS = this.props.timeState.ms - milliseconds;
    this.props.updateTime(updatedMS);
  }

  increment = (milliseconds) => {
    const updatedMS = this.props.timeState.ms + milliseconds;
    this.props.updateTime(updatedMS);
  }

  render() {
    const buttons = [
      {
        unit: 'seconds',
        duration: 6,
      },
      {
        unit: 'minutes',
        duration: 1,
      },
      {
        unit: 'minutes',
        duration: 10,
      },
      {
        unit: 'hours',
        duration: 1,
      },
      {
        unit: 'hours',
        duration: 8,
      },
      {
        unit: 'days',
        duration: 1,
      },
    ];

    return (
      <div>
        <Header />
        <div className={style.controls}>
          <Controls
            resetTime={this.resetTime}
            setFormat24={this.setFormat24}
            setFormat12={this.setFormat12}
            militaryTime={this.props.timeState.militaryTime}
          />
        </div>
        <div className={style.timeKeeper}>
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

          <div className={style.buttons}>
            {buttons.map(button => (
              <IncrementButton
                key={`${button.unit}-${button.duration}`}
                increment={this.increment}
                decrement={this.decrement}
                initialMs={this.props.timeState.ms}
                duration={button.duration}
                unit={button.unit}
              />))}
          </div>
        </div>
      </div>
    );
  }
}

AppContainer.propTypes = {
  updateFormat: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  timeState: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  timeState: state.timeState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateFormat,
  updateTime,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
