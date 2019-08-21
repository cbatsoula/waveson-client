import React from 'react';
import Banner from '../components/Banner';
import BeachContainer from './BeachContainer';
import FavContainer from './FavContainer';

const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`


class MainContainer extends React.Component {


  render () {
    console.log("main", this.props.beachSaveData, this.props)
    return (
      <div className="Main-Container">
        <Banner title={"Nearby"}/>
        <BeachContainer selectBeach={this.props.selectBeach} beachData={this.props.beachData}/>
        <Banner title={"Saved"}/>

        <FavContainer currentUser={this.props.currentUser} selectBeach={this.props.selectBeach} theFavs={this.props.doTheThing()} />

      </div>

    )
  }
}

export default MainContainer;
