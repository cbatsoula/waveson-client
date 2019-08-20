import React from 'react';

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
  // toggleList(){
  //   this.setState(prevState => ({
  //     listOpen: !prevState.listOpen
  //   }))
  // }
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
    switch(param) {
      case 'one':
        console.log("fuck you buddy")
        return 'bar';
      default:
        return 'foo';
    }

  }


  wht = (e) => {
   this.setState({selected: e.target.value}, () => this.renderWeather(this.state.selected));

  }
  render () {
    console.log("im pissed off", this.state)
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
        {
          this.state.selected === "three"
          ?
          (<ul>
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

          </ul>)
          :
          null
        }




        <select name="select" onChange={this.wht}>
          <option value={"one"}>fuck you</option>
          <option value={"two"}>fuck you</option>
          <option value={"three"}>fuck you</option>
          <option value={"four"}>fuck you</option>
          <option value={"five"}>fuck you</option>
          <option value={"six"}>fuck you</option>
          <option value={"seven"}>fuck you</option>
        </select>

      </div>
    )
  }
}

export default BeachDetails;
