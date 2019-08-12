import React from 'react';
import BeachDetails from './BeachDetails'

  const WORLD_API_KEY = `${process.env.REACT_APP_WORLD_API_KEY}`

class Show extends React.Component {
  state = {
    stats: []
  }

  componentDidMount() {

    fetch(`https://api.worldweatheronline.com/premium/v1/marine.ashx?tide=yes&key=a1f576b5405f4059a00170203190508&format=json&q=${this.props.currentBeach.geometry.location.lat},${this.props.currentBeach.geometry.location.lng}`)
      .then( r => r.json() )
      .then( data => {
        this.setState({
          stats: data
        }, () => {console.log(this.state.stats.data.weather)})
      })
  }

      // {this.state.stats.data.weather[0].astronomy.sunrise}
  render () {
    console.log("SHOW STATE", this.state.stats.data)
    console.log("Show!!", this.props.currentBeach.geometry.location.lat, this.props.currentBeach.geometry.location.lng)
    return (
      <div className="Show">
      im a show page
        <BeachDetails />

      </div>
    )
  }
}

export default Show;
