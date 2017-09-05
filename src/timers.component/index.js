// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseTimer } from '../utils';

import style from './style.scss';

type Props = {
  onSubmit: (timer: {
    ms: number,
    text: string,
  }) => void,
}

type State = {
  timer: string,
  isValid: ?boolean,
};

export default class Timers extends Component<Props, State> {
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
    const inputClasses = (this.state.isValid === false) ? `${style.input} ${style.invalid}` : style.input;

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
          <div className={style.header}>ACTIVE</div>
          <div className={style.list}>
            <div className={style.timer}>
              <span className={style.time}>in 20m</span>: <span className={style.text}>Text</span>
            </div>
            <div className={style.timer}>
              <span className={style.time}>in 30m</span>: <span className={style.text}>Text</span>
            </div>
            <div className={style.timer}>
              <span className={style.time}>in 40m</span>: <span className={style.text}>Text</span>
            </div>
          </div>

          <div className={style.header}>EXPIRED</div>
          <div className={style.list}>
            <div className={style.timer}>
              <span className={style.time}>20m ago</span>: <span className={style.text}>
                This is when the torch that everyone loves finally goes out :(</span>
            </div>
            <div className={style.timer}>
              <span className={style.time}>30m ago</span>: <span className={style.text}>Text</span>
            </div>
            <div className={style.timer}>
              <span className={style.time}>40m ago</span>: <span className={style.text}>Text</span>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

Timers.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
