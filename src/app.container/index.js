import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from '@aglet/components';
import { pull } from 'lodash';

import { addButton, removeButtons, resetTime, updateFormat, updateTime } from '../actions/timekeeper.actions';
import IncrementButton from '../increment-button.component';
import Sundial from '../sundial.component';
import Controls from '../controls.component';
import { getPhaseOfMoon } from '../utils';
import style from './style.scss';

class AppContainer extends Component {
  state = {
    buttonsEditMode: false,
    buttonsToDelete: [],
    newButtonText: '',
  }

  setFormat12 = () => this.props.updateFormat(false);
  setFormat24 = () => this.props.updateFormat(true);
  resetTime = () => this.props.resetTime();
  toggleButtonsEditMode = () => this.setState({ buttonsEditMode: !this.state.buttonsEditMode });
  addButton = button => this.props.addButton(button);
  handleNewButtonText = text => this.setState({ newButtonText: text });

  cancelRemoveButtons = () => {
    this.toggleButtonsEditMode();
    this.setState({ buttonsToDelete: [] });
  }

  markButtonForDeletion = (index) => {
    const buttonsToDelete = this.state.buttonsToDelete;
    // if button is already checked for deletion then toggle it
    if (this.state.buttonsToDelete.includes(index)) {
      pull(buttonsToDelete, index);
    } else {
      buttonsToDelete.push(index);
    }

    this.setState({
      buttonsToDelete,
    });
  }

  removeButtons = () => {
    this.props.removeButtons(this.state.buttonsToDelete);
    this.cancelRemoveButtons();
  }

  decrement = (milliseconds) => {
    const updatedMS = this.props.timeState.ms - milliseconds;
    this.props.updateTime(updatedMS);
  }

  increment = (milliseconds) => {
    const updatedMS = this.props.timeState.ms + milliseconds;
    this.props.updateTime(updatedMS);
  }

  render() {
    return (
      <div>
        <Header />
        <div className={style.controls}>
          <Controls
            toggleButtonsEditMode={this.toggleButtonsEditMode}
            buttonsEditMode={this.state.buttonsEditMode}
            addButton={this.addButton}
            removeButtons={this.removeButtons}
            cancelRemoveButtons={this.cancelRemoveButtons}
            newButtonText={this.state.newButtonText}
            handleNewButtonText={this.handleNewButtonText}
            resetTime={this.resetTime}
            setFormat12={this.setFormat12}
            setFormat24={this.setFormat24}
            militaryTime={this.props.timeState.militaryTime}
          />
        </div>
        <div className={style.timeKeeper}>
          <div className={style.dayCount}>DAY {this.props.timeState.days}</div>
          <Sundial
            phaseOfMoon={getPhaseOfMoon(this.props.timeState.days, this.props.timeState.hours)}
            sky={this.props.timeState.sky}
            rotation={this.props.timeState.rotation}
          />
          <div className={style.time}>
            {this.props.timeState.hours}
            <span className={style.colon}>:</span>
            {this.props.timeState.minutes}
            <span className={style.colon}>:</span>
            {this.props.timeState.seconds}
          </div>

          <div className={style.buttons}>
            {this.props.timeState.buttons.map((button, index) => (
              <IncrementButton
                key={`${button.unit}-${button.duration}`}
                increment={this.increment}
                decrement={this.decrement}
                markButtonForDeletion={() => this.markButtonForDeletion(index)}
                initialMs={this.props.timeState.ms}
                duration={button.duration}
                unit={button.unit}
                editMode={this.state.buttonsEditMode}
                deleting={this.state.buttonsToDelete.includes(index)}
              />))}
          </div>
        </div>
      </div>
    );
  }
}

AppContainer.propTypes = {
  addButton: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  removeButtons: PropTypes.func.isRequired,
  updateFormat: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  timeState: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  timeState: state.timeState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addButton,
  resetTime,
  removeButtons,
  updateFormat,
  updateTime,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
