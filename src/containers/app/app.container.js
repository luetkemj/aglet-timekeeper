import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Footer, Header } from '@aglet/components';

import { undoUpdateTime, updateTime } from '../../actions/time/time.actions';
import { addTimer } from '../../actions/timers/timers.actions';
import IncrementButton from '../../components/increment-button/increment-button.component';
import Sundial from '../../components/sundial/sundial.component';
import Timers from '../../components/timers/timers.component';
import { getPhaseOfMoon } from '../../utils/time-ui/time-ui.utils';
import style from './app.container.style.scss';


function AppContainer(props) {
  const increment = (milliseconds) => {
    const updatedMS = props.timeState.ms + milliseconds;
    props.updateTime(updatedMS);
  };

  const buttons = [
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

  return (
    <div className={style.container}>
      <div>
        <Header />
        <div className={style.timeKeeper}>
          <div className={style.dayCount}>DAY {props.timeState.days}</div>
          <Sundial
            phaseOfMoon={getPhaseOfMoon(props.timeState.days, props.timeState.hours)}
            sky={props.timeState.sky}
            rotation={props.timeState.rotation}
          />
          <div className={style.time}>
            {props.timeState.hours}
            <span className={style.colon}>:</span>
            {props.timeState.minutes}
            <span className={style.colon}>:</span>
            {props.timeState.seconds}
          </div>

          <div className={style.buttons}>
            {buttons.map(button => (
              <IncrementButton
                key={`${button.unit}-${button.duration}`}
                increment={increment}
                duration={button.duration}
                unit={button.unit}
              />))}
          </div>
          <div className={style.controls}>
            <button
              onClick={() => props.updateTime(0)}
              disabled={props.timeState.ms === 0}
              className={style.button}
            >RESET</button>
            <button
              onClick={() =>
                props.undoUpdateTime(props.timeState.history[props.timeState.history.length - 2])}
              disabled={props.timeState.history.length === 1}
              className={style.button}
            >UNDO</button>
          </div>
        </div>

        <div className={style.timers}>
          <Timers
            onSubmit={input => props.addTimer(input, props.timeState.ms)}
          />
        </div>
      </div>
      <Footer repo={'https://github.com/luetkemj/aglet-timekeeper/'} />
    </div>
  );
}

AppContainer.propTypes = {
  addTimer: PropTypes.func.isRequired,
  undoUpdateTime: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  timeState: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  timeState: state.timeState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTimer,
  undoUpdateTime,
  updateTime,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);