import React from 'react';
import BeachDetails from './BeachDetails'

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

  saveBeach = () => {
    console.log("you got this!", this.props.currentUser, this.props.currentBeach)
    // let thisOne = this.props.allBeaches.map(beach => {
    //   if (beach.name === this.props.currentBeach.name) {
    //     return beach.id
    //   } else {
    //     return beach
    //   }
    // })
    let thisOne = this.props.allBeaches.find(beach => {
      return beach.name === this.props.currentBeach.name
    })
    console.log("save beach", thisOne)

    if (thisOne){
      fetch('http://localhost:3000/favs', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.currentUser.id,
          beach_id: thisOne.id,
        })
      })
        .then(r => r.json())
        .then(console.log)
    }
  }

//   handleDelete = (thing) => {
//   console.log("delete this review", thing.id)
//   fetch(`http://localhost:3000/reviews/${thing.id}`, {
//     method: "DELETE",
//   })
//     .then( r => r.json())
//     .then( data => {
//       console.log("removed", data)
//       var newItems = this.state.reviews.filter((review) => {
//         return review.id !== thing.id});
//     this.setState({ reviews: newItems });
//     })
// }

  removeBeach = () => {
    console.log("remove", this.props.beachSaveData )
    let userID = this.props.currentUser.id
    let thisOne = this.props.allBeaches.find(beach => {
      return beach.name === this.props.currentBeach.name
    })
    let favID = this.props.beachSaveData.find(fav => {
      return fav.user_id === userID && fav.beach_id === thisOne.id
        // console.log("remove favID", favID)
      })

      fetch(`http://localhost:3000/favs/${favID.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "DELETE",
          "Access-Control-Allow-Origin": "http://localhost"
        //   "Accept": "application/json",
        },
      })
        .then(r => r.json())
        .then(console.log)
    }
  //   console.log("you got this!", this.props.currentUser, this.props.currentBeach)
  //   let thisOne = this.props.allBeaches.find(beach => {
  //     return beach.name === this.props.currentBeach.name
  //   })
  //   // console.log("save beach", thisOne)
  //
  //   if (thisOne){

  //   }

      // {this.state.stats.data.weather[0].astronomy.sunrise}
  render () {
    console.log("SHOW STATE", this.state)
    console.log("user", this.props.currentUser)
    console.log("all beaches from api", this.props.allBeaches)
    return (
      <div>
        <div className="Show">
        {this.props.currentBeach.name}
          <div className="button">
          <button onClick={this.saveBeach}>Save</button>
          <button onClick={this.removeBeach}>Remove</button>
          </div>
        </div>
        {
          this.state.today
          ?
          <BeachDetails today={this.state.today}/>
          :
          null
        }
      </div>
    )
  }
}

export default Show;
