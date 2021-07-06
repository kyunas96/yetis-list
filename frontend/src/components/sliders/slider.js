import React from 'react';

const Slider = ({name, value, action}) => {
  const sliderName = name[0].toUpperCase() + name.slice(1);

  return (
  <div className="slider">
    <label for={name}>{sliderName}</label>
    <input 
      id={name} 
      type="range"
      min="0.0"
      max="1.0"
      step="0.025"
      // value="1.0"
      onChange={action}
      ></input>
  </div>
  )
}

export default Slider;