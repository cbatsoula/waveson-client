import React from 'react';

class BeachDetails extends React.Component {
  state = {
    weather: []
  }

  componentDidMount() {

  }

  renderWeather = () => {


  }

  render () {
    console.log("deets", this.props)
    return (
      <div className="Beach-Details">
        <ul>
          <li>Today's High F: {this.props.today.maxtempF}</li>
          <li>Today's High C: {this.props.today.maxtempC}</li>
          <li>Today's Low F: {this.props.today.mintempF}</li>
          <li>Today's Low C: {this.props.today.mintempC}</li>
          <li>Sunset: {this.props.today.astronomy[0].sunset}</li>
          <li>Sunrise: {this.props.today.astronomy[0].sunrise}</li>
          <li>Moonrise: {this.props.today.astronomy[0].moonrise}</li>
          <li>Moonset: {this.props.today.astronomy[0].moonset}</li>
          <li>Moon phase: {this.props.today.astronomy[0].moon_phase}</li>
          <li>Moon illumination: {this.props.today.astronomy[0].moon_illumination}%</li>

        </ul>


      </div>
    )
  }
}

export default BeachDetails;
