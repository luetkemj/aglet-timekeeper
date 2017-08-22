import React from 'react';
import PropTypes from 'prop-types';
import { each } from 'lodash';
import { parser } from '../utils';
import style from './style.scss';

export default function Controls(props) {
  const {
    addButton,
    buttonsEditMode,
    cancelRemoveButtons,
    timeFormat,
    newButtonText,
    handleNewButtonText,
    removeButtons,
    resetTime,
    restoreAllDefaults,
    setFormat12,
    setFormat24,
    toggleButtonsEditMode } = props;

  function onNewButtonSubmit() {
    each(parser(newButtonText), button => addButton(button));
    handleNewButtonText('');
  }

  function handleChange(event) {
    handleNewButtonText(event.target.value);
  }

  function editButtonsMode() {
    if (buttonsEditMode) {
      toggleButtonsEditMode();
      return removeButtons();
    }

    return toggleButtonsEditMode();
  }

  return (
    <div className={style.container}>
      <div className={style.name}>Time Format</div>
      <div className={style.buttonPair}>
        <button
          className={timeFormat ? style.button : `${style.button} ${style.active}`}
          onClick={() => setFormat12()}
        >12 hour</button>
        <button
          className={timeFormat ? `${style.button} ${style.active}` : style.button}
          onClick={() => setFormat24()}
        >24 hour</button>
      </div>

      <div className={style.name}>Add Buttons</div>
      <div className={style.textFieldContainer}>
        <input
          className={style.textField}
          type="text"
          placeholder="1s, 1m, 1h, 1d, 1y..."
          value={newButtonText}
          name="newButtonText"
          onChange={handleChange}
        />
        <button
          className={style.submitAdd}
          type="submit"
          onClick={onNewButtonSubmit}
        />
      </div>

      <div className={style.name}>Edit Buttons</div>
      <div className={style.buttonPair}>
        <button
          className={style.button}
          onClick={editButtonsMode}
        >{buttonsEditMode ? 'Delete' : 'Edit'}</button>
        {buttonsEditMode && <button
          className={style.button}
          onClick={cancelRemoveButtons}
        >Cancel</button>}
      </div>

      <div className={style.dangerZone}>
        <button
          className={style.textButton}
          onClick={() => resetTime()}
        >Reset Time</button>
        <button
          className={style.textButton}
          onClick={() => restoreAllDefaults()}
        >Restore Default Settings</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  addButton: PropTypes.func.isRequired,
  buttonsEditMode: PropTypes.bool.isRequired,
  cancelRemoveButtons: PropTypes.func.isRequired,
  handleNewButtonText: PropTypes.func.isRequired,
  timeFormat: PropTypes.bool.isRequired,
  newButtonText: PropTypes.string.isRequired,
  removeButtons: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  restoreAllDefaults: PropTypes.func.isRequired,
  toggleButtonsEditMode: PropTypes.func.isRequired,
  setFormat12: PropTypes.func.isRequired,
  setFormat24: PropTypes.func.isRequired,
};
