import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const IncrementButton =
  ({ decrement, deleting, markButtonForDeletion, duration, editMode, increment, unit }) => (
    <div className={`${style.container} ${deleting && style.deleting} ${editMode && style.editMode}`}>
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
      {editMode && <button
        className={`${style.button} ${style.deleteButton}`}
        onClick={markButtonForDeletion}
      ><div className={style.reject} /></button>}
    </div>
  );

IncrementButton.propTypes = {
  decrement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  markButtonForDeletion: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  deleting: PropTypes.bool,
};

IncrementButton.defaultProps = {
  editMode: false,
  deleting: false,
};

export default IncrementButton;
