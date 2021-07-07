import React from 'react';
import './slider.css';

const Slider = ({name, value, action, range}) => {
  const sliderName = name[0].toUpperCase() + name.slice(1);

  return (
    <div className="slider">
      <label htmlFor={name}>{sliderName}</label>
      <div className="slider-with-display">
        <input
          id={name}
          type="range"
          min={range.min}
          max={range.max}
          step="0.025"
          value={value}
          onChange={action}
        ></input>
        <span className="slider-value">{value}</span>
      </div>
    </div>
  );
}

export default Slider;