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
      popularity: 0.0,
      speechiness: 0.0,
      tempo: 0,
      happiness: 0.0,
    };
    this.setSliderValue = this.setSliderValue.bind(this);
    this.siftStateForParent = this.siftStateForParent.bind(this);
  }

  siftStateForParent(){
    let stateForParent = {};

    for(const [key, val] of Object.entries(this.state)){
      if(val !== 0 && val !== 0.0){
        console.log("val", val)
        stateForParent[key] = val;
      }
    }

    return stateForParent;
  }

  setSliderValue(valName){
    const action = this.props.action;

    return (e) => {
      this.setState({[valName]: e.target.value}, () =>{
        console.log("slider state", this.state)
        action(this.siftStateForParent());
      });
    }
  }

  render(){
    const sliders = [];
    const defRange = {min: 0.0, max: 1.0};
    let counter = 0;
    const tempo = (
      <Slider 
        name={"tempo"} 
        value={this.state.tempo} 
        action={this.setSliderValue("tempo")}
        range={{min: 50.0, max: 200.0}}
        key={counter++}
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
        action={this.setSliderValue(key)}
        key={counter++} />
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