import React from 'react';
import Slider from './slider';

class SlidersContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      acousticness: 0.0,
      danceability: 0.0,
      energy: 0.0,
      instrumentalness: 0.0,
      liveness: 0.0,
      loudness: 0.0,
      popularity: 0.0,
      speechiness: 0.0,
      tempo: 0,
      happiness: 0.0,
    };
  }

  render(){
    const sliderNames = Object.keys(this.state);

    return (
      <div className="sliders-container">
        {sliderNames.map((ele) => (
          <Slider slider={ele} />
        ))}
      </div>
    );
  }
}

export default SlidersContainer;