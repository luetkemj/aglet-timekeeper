import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Footer, Header } from '@aglet/components';
import { last } from 'lodash';

import { bootstrap } from '../../actions/app/app.actions';
import { undoUpdateTime, updateTime } from '../../actions/time/time.actions';
import { addTimer } from '../../actions/timers/timers.actions';
import IncrementButton from '../../components/increment-button/increment-button.component';
import Sundial from '../../components/sundial/sundial.component';
import Timers from '../../components/timers/timers.component';
import { getPhaseOfMoon } from '../../utils/time-ui/time-ui.utils';
import style from './app.container.style.scss';


class AppContainer extends Component {
  constructor(props) {
    super();

    props.bootstrap();
  }

  increment = (milliseconds) => {
    const updatedMS = last(this.props.historyState.time) + milliseconds;
    this.props.updateTime(updatedMS);
  };

  buttons = [
    {
      duration: 6,
      unit: 's',
    },
    {
      duration: 1,
      unit: 'm',
    },
    {
      duration: 5,
      unit: 'm',
    },
    {
      duration: 1,
      unit: 'h',
    },
    {
      duration: 4,
      unit: 'h',
    },
    {
      duration: 1,
      unit: 'd',
    },
  ];

  render() {
    const { timeState } = this.props;

    return (
      <div className={style.container}>
        <div>
          <Header />
          <div className={style.timeKeeper}>
            <div className={style.dayCount}>DAY {timeState.days}</div>
            <Sundial
              phaseOfMoon={getPhaseOfMoon(timeState.days, timeState.hours)}
              sky={timeState.sky}
              rotation={timeState.rotation}
            />
            <div className={style.time}>
              {timeState.hours}
              <span className={style.colon}>:</span>
              {timeState.minutes}
              <span className={style.colon}>:</span>
              {timeState.seconds}
            </div>

            <div className={style.buttons}>
              {this.buttons.map(button => (
                <IncrementButton
                  key={`${button.unit}-${button.duration}`}
                  increment={this.increment}
                  duration={button.duration}
                  unit={button.unit}
                />))}
            </div>
            <div className={style.controls}>
              <button
                onClick={() => this.props.updateTime(0)}
                disabled={timeState.ms === 0}
                className={style.button}
              >RESET</button>
              <button
                onClick={() => {
                  const time = this.props.historyState.time;
                  this.props.undoUpdateTime(time[time.length - 2]);
                }}
                disabled={this.props.historyState.time.length === 1}
                className={style.button}
              >UNDO</button>
            </div>
          </div>

          <div className={style.timers}>
            <Timers
              onSubmit={input => this.props.addTimer(input, timeState.ms)}
            />
          </div>
        </div>
        <Footer repo={'https://github.com/luetkemj/aglet-timekeeper/'} />
      </div>
    );
  }
}

AppContainer.propTypes = {
  addTimer: PropTypes.func.isRequired,
  bootstrap: PropTypes.func.isRequired,
  undoUpdateTime: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  timeState: PropTypes.shape().isRequired,
  historyState: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  timeState: state.timeState,
  historyState: state.historyState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTimer,
  bootstrap,
  undoUpdateTime,
  updateTime,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
