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

  // 
  // saveBeach = () => {
  //   console.log("you got this!", this.props.currentUser, this.props.currentBeach)
  //
  //   let thisOne = this.props.allBeaches.find(beach => {
  //     return beach.name === this.props.currentBeach.name
  //   })
  //
  //   let userID = this.props.currentUser.id
  //   console.log("save beach", thisOne)
  //   let favCheck = this.props.theFavs.find(beach => {return beach.id === thisOne.id})
  //
  //   // let favCheck = this.props.beachSaveData.find(beach => {
  //   //   return beach.id === thisOne.id && beach.user_id === userID})
  //
  //   console.log("wut", thisOne && !favCheck)
  //   // debugger;
  //   if (thisOne && !favCheck){
  //     fetch('http://localhost:3000/favs', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user_id: this.props.currentUser.id,
  //         beach_id: thisOne.id,
  //       })
  //     })
  //       .then(r => r.json())
  //       .then(console.log)
  //   }
  // }
  //
  // removeBeach = () => {
  //   console.log("remove", this.props.beachSaveData )
  //   let userID = this.props.currentUser.id
  //   let thisOne = this.props.allBeaches.find(beach => {
  //     return beach.name === this.props.currentBeach.name
  //   })
  //   let favID = this.props.beachSaveData.find(fav => {
  //     return fav.user_id === userID && fav.beach_id === thisOne.id
  //       // console.log("remove favID", favID)
  //     })
  //
  //     fetch(`http://localhost:3000/favs/${favID.id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Methods": "DELETE",
  //         "Access-Control-Allow-Origin": "http://localhost"
  //       //   "Accept": "application/json",
  //       },
  //     })
  //       .then(r => r.json())
  //       .then(console.log)
  //   }
  //   console.log("you got this!", this.props.currentUser, this.props.currentBeach)
  //   let thisOne = this.props.allBeaches.find(beach => {
  //     return beach.name === this.props.currentBeach.name
  //   })
  //   // console.log("save beach", thisOne)
  //


  // this.props.beachSaveData.find(beach => {return beach.user_id === this.props.currentUser.id})

  render () {
    // console.log("SHOW STATE", this.state)
    // console.log("user", this.props.currentUser)
    // console.log("all beaches from api", this.props.allBeaches)
    return (
      <div className="Show">

        <div className="Show-Details">
          {this.props.currentBeach.name}

          <button onClick={this.props.saveBeach}>SAVE</button>
          <button onClick={this.props.removeBeach}>REMOVE</button>

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
