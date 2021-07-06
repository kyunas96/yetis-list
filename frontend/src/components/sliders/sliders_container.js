import React from 'react';
import Slider from './slider';
import './sliders_container.css';

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
    const defRange = {min: 0.0, max: 1.0};
    const tempo = (
      <Slider 
        name={"tempo"} 
        value={this.state.tempo} 
        action={this.setSliderValue("tempo")}
        range={{min: 50.0, max: 200.0}}
      />
      )
    for(const [key, val] of Object.entries(this.state)){
      if(key === "tempo"){
        sliders.push(tempo);
        continue;
      }
      sliders.push(
        <Slider 
        name={key} 
        value={val} 
        range={defRange}
        action={this.setSliderValue(key)} />
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