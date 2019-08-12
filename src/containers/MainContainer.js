import React from 'react'
import Banner from '../components/Banner'
import BeachContainer from './BeachContainer'

class MainContainer extends React.Component {



  render () {
    console.log("main", this.props.beachData)

    return (
      <div className="Main-Container">
        <h2> main container </h2>
        <Banner />
        <BeachContainer selectBeach={this.props.selectBeach} beachData={this.props.beachData}/>


        <Banner />

      </div>

    )
  }
}

export default MainContainer;
