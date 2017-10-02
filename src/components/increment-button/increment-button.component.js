import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import style from './increment-button.component.style.scss';

const IncrementButton =
  ({ duration, increment, unit }) => (
    <button
      className={`${style.button} ${style.incrementButton}`}
      onClick={() => increment(moment.duration(duration, unit).asMilliseconds())}
    >
      <span className={style.duration}>{duration}</span>
      <span className={style.unit}>{unit.slice(0, 1)}</span>
    </button>
  );

IncrementButton.propTypes = {
  increment: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default IncrementButton;
