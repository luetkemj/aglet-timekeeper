import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const IncrementButton = ({ decrement, increment, unit, duration }) => (
  <div className={style.container}>
    <button
      className={`${style.button} ${style.incrementButton}`}
      onClick={() => increment(moment.duration(duration, unit).asMilliseconds())}
    ><div className={style.arrow} /></button>
    <div className={style.textWrapper}>
      <span className={style.duration}>{duration}</span>
      <span className={style.unit}>{unit.slice(0, 1)}</span>
    </div>
    <button
      className={`${style.button} ${style.decrementButton}`}
      onClick={() => decrement(moment.duration(duration, unit).asMilliseconds())}
    ><div className={style.arrow} /></button>
  </div>
);

IncrementButton.propTypes = {
  decrement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default IncrementButton;
