import React from 'react';
import Hourly from '../components/Hourly'
class BeachDetails extends React.Component {

  state = {
    weather: [],
    listOpen: false,
    fuck: false,
    selected: null,
    one: null,
    two: null,
    three: null,
    four: null,
    five: null,
    six: null,
    seven: null,
    eight:  null,
  }

  componentDidMount() {
    let uh = this.props.today.hourly
    this.setState({
      one: uh[0],
      two: uh[1],
      three: uh[2],
      four: uh[3],
      five: uh[4],
      six: uh[5],
      seven: uh[6],
      eight: uh[7]
    })

  }

  renderWeather = (param) => {
    switch(this.state.selected) {
      case 'one':
        // console.log("one")
        return <Hourly weather={this.state.one}/>;
      case 'two':
        // console.log("two")
        return <Hourly weather={this.state.two}/>;
      case 'three':
        // console.log("three")
        return <Hourly weather={this.state.three}/>;
      case 'four':
        // console.log("four")
        return <Hourly weather={this.state.four}/>;
      case 'five':
        // console.log("five")
        return <Hourly weather={this.state.five}/>;
      case 'six':
        // console.log("six")
        return <Hourly weather={this.state.six}/>;

      case 'seven':
        // console.log("seven")
        return <Hourly weather={this.state.seven}/>;
      case 'eight':
        // console.log("eight")
        return <Hourly weather={this.state.eight}/>;
      default:
        return null;
    }

  }

  wht = (e) => {
   this.setState({selected: e.target.value}, () => this.renderWeather(this.state.selected));

  }
  render () {
    console.log("im pissed off", this.state)
    console.log("deets", this.props)
    return (
      <>
      <div className="Hourly-Time">
        Select Time

        <select name="select" onChange={this.wht}>
        <option value={"zero"}>select</option>
        <option value={"one"}>12am - 3am</option>
        <option value={"two"}>3am - 6am</option>
        <option value={"three"}>6am - 9am</option>
        <option value={"four"}>9am - 12pm</option>
        <option value={"five"}>12pm - 3pm</option>
        <option value={"six"}>3pm - 5pm</option>
        <option value={"seven"}>5pm - 9pm</option>
        <option value={"eight"}>9pm - 12am</option>
        </select>
      </div>

      <div className="Beach-Details">
        <ul>
          <li>Today's high: {this.props.today.maxtempF} F / {this.props.today.maxtempC} C</li>
          <li>Today's low: {this.props.today.mintempF} F / {this.props.today.mintempC} C</li>
          <li>Moonrise: {this.props.today.astronomy[0].moonrise}</li>
          <li>Moonset: {this.props.today.astronomy[0].moonset}</li>
          <li>Moon phase: {this.props.today.astronomy[0].moon_phase}</li>
          <li>Moon illumination: {this.props.today.astronomy[0].moon_illumination}%</li>
          <li>Sunset: {this.props.today.astronomy[0].sunset}</li>
          <li>Sunrise: {this.props.today.astronomy[0].sunrise}</li>  

        </ul>
        <div className="Hourly">
          {this.renderWeather()}
        </div>

      </div>
      </>
    )
  }
}

export default BeachDetails;
