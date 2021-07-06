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
    this.setSliderValue = this.setSliderValue.bind(this);
  }

  setSliderValue(valName){
    return (e) => {
      this.setState({[valName]: e.target.value}, );
    }
  }

  render(){
    const sliders = [];
    for(const [key, val] of Object.entries(this.state)){
      sliders.push(
        <Slider name={key} value={val} action={this.setSliderValue(key)} />
      )
    }

    return (
      <div className="sliders-container">
        {sliders}
      </div>
    );
  }
}

export default SlidersContainer;