import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

export default class Timers extends Component {
  state = {
    timer: '',
    isValid: null,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    // @TODO this regex should happen on submit instead and include and error with example of a
    // correct input
    // const regEx = /^(?:\d*\.)?\d\w+:/g;
    // const result = regEx.exec(event.target.value);

    // need to check if result is valid (uses denominations we care about)
    // need to check if there is text after valid timer
    //
    // this.setState({
    //   isValid: result || false,
    // });
  }

  handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();

    // don't allow empty submissions
    if (!this.state.timer) {
      return;
    }

    // focus the button to blur the input field
    event.currentTarget.focus();
    this.props.onSubmit(this.state.timer);
    this.setState({
      timer: '',
    });
  }

  render() {
    console.log(this.state);

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
