import React from 'react';
import Banner from '../components/Banner';
import BeachContainer from './BeachContainer';
import FavContainer from './FavContainer';


class MainContainer extends React.Component {

  state = {
    beachSaveData: null,
    theFavs: [],
  }


  componentDidMount() {
    fetch('http://localhost:3000/favs')
      .then( r => r.json())
      .then( data => {
        // console.log("wtf my dude", data)
        this.setState({
          beachSaveData: data
        }, () => {this.doTheThing()})
      })
  }

  // renderBeachStuff = () => {
    // let beachID = this.props.allBeaches.map(beach => {
    //   return beach.id
    // })
    // if (this.state.beachSaveData > 1) {
    // let compare = this.state.beachSaveData.filter(fav => {
    //   // debugger;
    //   return fav.beach_id
      // debugger;
  //   })
  //   // }
  //   console.log("render saved", beachID, compare)
  // }


  doTheThing = () => {
    const finalArray = [];
    let arr1 = this.props.allBeaches.map(beach => {
      return beach
    })
    let arr2 = this.state.beachSaveData.map(fav => {
      return fav
    })
    let userID = this.props.currentUser.id
    // debugger;
    arr1.forEach((e1) => arr2.forEach((e2) =>
      {if (e1.id === e2.beach_id && userID === e2.user_id ){
        // debugger;
        finalArray.push(e1)
      }
    }
  ))
  return finalArray
  // console.log("final array", finalArray)
  this.setState({
    theFavs: finalArray
  })
  }

  render () {
    console.log("main", this.props.beachSaveData, this.props.currentUser)
    return (
      <div className="Main-Container">
        <Banner title={"Nearby"}/>
        <BeachContainer selectBeach={this.props.selectBeach} beachData={this.props.beachData}/>
        <Banner title={"Saved"}/>
        {
          this.state.beachSaveData
          ?
          <FavContainer currentUser={this.props.currentUser} selectBeach={this.props.selectBeach} theFavs={this.doTheThing()} />
          :
          null
        }

      </div>

    )
  }
}

export default MainContainer;
