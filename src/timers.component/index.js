// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import prettyMs from 'pretty-ms';
import { parseTimer } from '../utils';

import style from './style.scss';

type Props = {
  onSubmit: (timer: {
    ms: number,
    text: string,
  }) => void,
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
  },
  timeState: {
    ms: number,
  }
}

type State = {
  timer: string,
  isValid: ?boolean,
};

class Timers extends Component<Props, State> {
  state = {
    timer: '',
    isValid: null,
  }

  handleChange = (event: {
    target: {
      name: string,
      value: string,
    }
  }) => {
    this.setState({
      [event.target.name]: event.target.value,
      isValid: null,
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

    const timer = parseTimer(this.state.timer);

    this.setState({
      isValid: !!timer || false,
    });

    // focus the button to blur the input field
    event.currentTarget.focus();
    if (timer) { this.props.onSubmit(timer); }
    this.setState({
      timer: '',
    });
  }

  render() {
    const { ms } = this.props.timeState;
    const inputClasses = (this.state.isValid === false) ? `${style.input} ${style.invalid}` : style.input;

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

    const inactiveTimersToRender = this.props.timersState.expired.map(timer => (
      <div
        key={`${timer.ms}${timer.text}`}
        className={style.timer}
      >
        <span
          className={style.time}
        >{prettyMs(ms - timer.ms)}</span> <span className={style.adverb}>ago: </span>
        <span className={style.text}>{timer.text}</span>
      </div>
    ));

    let activeTimersBlock;
    if (activeTimersToRender.length) {
      activeTimersBlock = (
        <div>
          <div className={style.header}>ACTIVE</div>
          <div className={style.list}>
            {activeTimersToRender}
          </div>
        </div>
      );
    }

    let inactiveTimersBlock;
    if (inactiveTimersToRender.length) {
      inactiveTimersBlock = (
        <div>
          <div className={style.header}>EXPIRED</div>
          <div className={style.list}>
            {inactiveTimersToRender}
          </div>
        </div>
      );
    }

    return (
      <div className={style.container}>
        <div className={style.componentHead}>
          <div className={style.title}>TIMERS</div>
          <button
            type="submit"
            className={`${style.button} ${style.submit}`}
            onClick={this.handleSubmit}
          >SUBMIT</button>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            className={inputClasses}
            type="text"
            name="timer"
            placeholder="1h: torch goes out"
            value={this.state.timer}
            onChange={this.handleChange}
          />
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
