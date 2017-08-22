import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { each } from 'lodash';
import { parser } from '../utils';
import style from './style.scss';

export default class Controls extends Component {
  state = {
    newButtonText: '',
  }

  onNewButtonSubmit = () => {
    each(parser(this.state.newButtonText), button => this.props.addButton(button));
    this.setState({
      newButtonText: '',
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  editButtonsMode = () => {
    if (this.props.buttonsEditMode) {
      this.props.toggleEditMode();
      return this.props.removeButtons();
    }

    return this.props.toggleEditMode();
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.name}>Time Format</div>
        <div className={style.buttonPair}>
          <button
            className={this.props.militaryTime ? style.button : `${style.button} ${style.active}`}
            onClick={() => this.props.setFormat12()}
          >12 hour</button>
          <button
            className={this.props.militaryTime ? `${style.button} ${style.active}` : style.button}
            onClick={() => this.props.setFormat24()}
          >24 hour</button>
        </div>

        <div className={style.name}>Add Buttons</div>
        <div className={style.textFieldContainer}>
          <input
            className={style.textField}
            type="text"
            placeholder="1s, 1m, 1h, 1d, 1y..."
            value={this.state.newButtonText}
            name="newButtonText"
            onChange={this.handleChange}
          />
          <button
            className={style.submitAdd}
            type="submit"
            onClick={this.onNewButtonSubmit}
          />
        </div>

        {/* <div className={style.name}>Remove Buttons</div> */}
        <div className={style.buttonPair}>
          <button
            className={style.button}
            onClick={this.editButtonsMode}
          >{this.props.buttonsEditMode ? 'Delete' : 'Edit Buttons'}</button>
          {this.props.buttonsEditMode && <button
            className={style.button}
            onClick={this.props.cancelRemoveButtons}
          >Cancel</button>}
        </div>

        <div className={style.dangerZone}>
          {/* <button className={style.textButton}>Restore Defaults</button> */}
          <button
            className={style.textButton}
            onClick={() => this.props.resetTime()}
          >Reset Time</button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  addButton: PropTypes.func.isRequired,
  buttonsEditMode: PropTypes.bool.isRequired,
  cancelRemoveButtons: PropTypes.func.isRequired,
  removeButtons: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  setFormat12: PropTypes.func.isRequired,
  setFormat24: PropTypes.func.isRequired,
  militaryTime: PropTypes.bool.isRequired,
};
