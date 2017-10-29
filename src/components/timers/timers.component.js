// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import prettyMs from 'pretty-ms';
import { find, get } from 'lodash';

import style from './timers.component.style.scss';

type Props = {
  onSubmit: (timer: string) => void,
  clearError: () => void,
  timersState: {
    timers: [{
      ms: number,
      text: string,
    }],
    active: [{
      ms: number,
      text: string,
    }],
    expired: [{
      ms: number,
      text: string,
    }],
    recentlyExpired: [{
      ms: number,
      text: string,
    }],
    error: ?string,
  },
  timeState: {
    ms: number,
  }
}

type State = {
  timer: string,
};

class Timers extends Component<Props, State> {
  state = {
    timer: '',
  }

  componentWillReceiveProps(nextProps) {
    // if nextProps timers do not equal thisProps timers then we have successfully submitted one
    // and should clear the add timer form
    if (JSON.stringify(nextProps.timersState.timers) !==
        JSON.stringify(this.props.timersState.timers)) {
      this.setState({
        timer: '',
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.timer !== nextState.timer &&
        this.props.timersState.error) {
      this.props.clearError();
    }
  }

  handleChange = (event: {
    target: {
      name: string,
      value: string,
    }
  }) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event: {
    stopPropagation: () => void,
    preventDefault: () => void,
    currentTarget: { focus: () => void },
    target: { value: string }
  }) => {
    event.stopPropagation();
    event.preventDefault();

    // don't allow empty submissions
    if (!this.state.timer) {
      return;
    }

    // focus the button to blur the input field
    event.currentTarget.focus();
    this.props.onSubmit(this.state.timer);
  }

  render() {
    const { ms } = this.props.timeState;
    const { error } = this.props.timersState;
    const inputClasses = (error) ? `${style.input} ${style.invalid}` : style.input;

    const activeTimersToRender = this.props.timersState.active.map(timer => (
      <div
        key={`${timer.ms}${timer.text}`}
        className={style.timer}
      >
        <span className={style.adverb}>in</span> <span
          className={style.time}
        >{prettyMs(timer.ms - ms)}: </span><span className={style.text}>{timer.text}</span>
      </div>
    ));

    const inactiveTimersToRender = this.props.timersState.expired.map((timer) => {
      let timerClasses = style.timer;
      if (find(this.props.timersState.recentlyExpired, { ...timer })) {
        timerClasses += ` ${style.alert}`;
      }

      return (
        <div
          key={`${timer.ms}${timer.text}`}
          className={timerClasses}
        >
          <span
            className={style.time}
          >{prettyMs(ms - timer.ms)}</span> <span className={style.adverb}>ago: </span>
          <span className={style.text}>{timer.text}</span>
        </div>
      );
    });

    const activeTimersBlock = (
      <div>
        <div className={style.header}>ACTIVE</div>
        <div className={style.list}>
          {activeTimersToRender.length
            ? activeTimersToRender
            : <div>No active timers</div>}
        </div>
      </div>
    );

    const inactiveTimersBlock = (
      <div>
        <div className={style.header}>EXPIRED</div>
        <div className={style.list}>
          {inactiveTimersToRender.length
            ? inactiveTimersToRender
            : <div>No expired timers</div>}
        </div>
      </div>
    );

    let alertsToRender;
    if (this.props.timersState.recentlyExpired.length) {
      alertsToRender = this.props.timersState.recentlyExpired.map(timer => (
        <div
          key={`${timer.ms}${timer.text}`}
          className={style.alert}
        >
          <span
            className={style.time}
          >{prettyMs(ms - timer.ms)}</span> <span className={style.adverb}>ago: </span>
          <span className={style.text}>{timer.text}</span>
        </div>
      ));
    }

    let alertsBlock;
    if (alertsToRender) {
      alertsBlock = (
        <div className={style.alerts}>{alertsToRender}</div>
      );
    }

    let errorMessageToRender;
    const errorMessage = get(error, 'message');
    if (get(error, 'message')) {
      errorMessageToRender = errorMessage;
    }


    return (
      <div className={style.container}>
        {alertsBlock}
        <div className={style.componentHead}>
          <div className={style.title}>TIMERS</div>
        </div>
        <form
          className={style.form}
          onSubmit={this.handleSubmit}
        >
          <div className={style.formHead}>
            <label
              htmlFor="timer"
              className={style.label}
            >Add new timer: [duration][unit]: [text]
            </label>
            <button
              type="submit"
              className={`${style.button} ${style.submit}`}
              onClick={this.handleSubmit}
            >SUBMIT</button>
          </div>
          <input
            className={inputClasses}
            type="text"
            name="timer"
            placeholder="1h: torch goes out"
            value={this.state.timer}
            onChange={this.handleChange}
          />
          <div className={style.message}>{errorMessageToRender}</div>
        </form>

        <div className={style.timers}>
          {activeTimersBlock}
          {inactiveTimersBlock}
        </div>

      </div>
    );
  }
}

Timers.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  timersState: PropTypes.shape().isRequired,
  timeState: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  timersState: state.timersState,
  timeState: state.timeState,
});

export default connect(
  mapStateToProps,
  null,
)(Timers);
