import React from 'react';
import BeachDetails from './BeachDetails';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import NoteStuff from './NoteStuff';
// import why from './why.html';

  const WORLD_API_KEY = `${process.env.REACT_APP_WORLD_API_KEY}`

class Show extends React.Component {
  state = {
    stats: [],
    today: null,
  }

  componentDidMount() {

    fetch(`https://api.worldweatheronline.com/premium/v1/marine.ashx?tide=yes&key=a1f576b5405f4059a00170203190508&format=json&q=${this.props.currentBeach.geometry.location.lat},${this.props.currentBeach.geometry.location.lng}`)
      .then( r => r.json() )
      .then( data => {
        this.setState({
          stats: data
        }, () => {
          // console.log(this.state.stats.data.weather[0])
          this.renderToday()
        })
      })
  }

  renderToday = () => {
    let todayWeather = this.state.stats.data.weather[0]
    this.setState({
      today: todayWeather
    }, () => {console.log(this.state.today)})
  }



  render () {
    // console.log("SHOW STATE", this.state)
    // console.log("user", this.props.currentUser)
    // console.log("all beaches from api", this.props.allBeaches)
    return (
      <div className="Show">

        <div className="Show-Details">
          {this.props.currentBeach.name}

          <button onClick={this.props.saveBeach}>📌 SAVE</button>
          <button onClick={this.props.removeBeach}>🗑️ REMOVE</button>

        </div>
        {
          this.state.today
          ?
          <BeachDetails today={this.state.today}/>
          :
          null
        }
        <Banner title={"Notes"}/>
        <NoteStuff allBeaches={this.props.allBeaches} currentUser={this.props.currentUser} currentBeach={this.props.currentBeach}/>
      </div>
    )
  }
}

export default Show;
