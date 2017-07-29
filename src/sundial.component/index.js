import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Sundial = (props) => {
  const { sky, rotation, phaseOfMoon } = props;
  const counterRotation = rotation * -1;
  const rotate = {
    transform: `rotate(${rotation}deg)`,
  };
  const counterRotate = {
    transform: `rotate(${counterRotation}deg)`,
  };
  const skyColor = style[sky];

  const phaseClass = `moon${phaseOfMoon}`;
  const moonClasses = `${style.moon} ${style[phaseClass]}`;

  return (
    <div className={style.sundial}>
      <div className={`${style.sky} ${skyColor}`}>
        <div className={style.stars} />
        <div className={style.sunMoon} style={rotate}>
          <div className={style.sun} style={counterRotate} />
          <div className={moonClasses} style={counterRotate} />
        </div>
      </div>
    </div>
  );
};

Sundial.propTypes = {
  phaseOfMoon: PropTypes.number.isRequired,
  sky: PropTypes.string.isRequired,
  rotation: PropTypes.number.isRequired,
};

export default Sundial;
