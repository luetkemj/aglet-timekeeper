import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const IncrementButton = ({ increment, initialMs, unit, duration }) => (
  <button
    className={style.button}
    onClick={() => increment(initialMs, moment.duration(duration, unit).asMilliseconds())}
  >
    <span className={style.duration}>{duration}</span>
    <span className={style.unit}>{unit.slice(0, 1)}</span>
  </button>
);

IncrementButton.propTypes = {
  increment: PropTypes.func.isRequired,
  initialMs: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default IncrementButton;
