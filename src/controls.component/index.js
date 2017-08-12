import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

export default function Controls(props) {
  return (
    <div className={style.container}>
      <div className={style.name}>Time Format</div>
      <div className={style.buttonPair}>
        <button
          className={props.militaryTime ? style.button : `${style.button} ${style.active}`}
          onClick={() => props.setFormat12()}
        >12 hour</button>
        <button
          className={props.militaryTime ? `${style.button} ${style.active}` : style.button}
          onClick={() => props.setFormat24()}
        >24 hour</button>
      </div>

      <div className={style.name}>Add Button</div>
      <div className={style.textFieldContainer}>
        <input className={style.textField} type="text" />
        <button className={style.submitAdd} />
      </div>

      <div className={style.name}>Remove Buttons</div>
      <div className={style.buttonPair}>
        <button className={style.button}>Edit</button>
        <button className={style.button}>Cancel</button>
      </div>

      <div className={style.dangerZone}>
        <button className={style.textButton}>Restore Defaults</button>
        <button className={style.textButton} onClick={() => props.resetTime()}>Reset Time</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  resetTime: PropTypes.func.isRequired,
  setFormat12: PropTypes.func.isRequired,
  setFormat24: PropTypes.func.isRequired,
  militaryTime: PropTypes.bool.isRequired,
};
