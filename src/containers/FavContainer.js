import React from 'react';
import BeachCard from '../components/BeachCard';

class FavContainer extends React.Component {

  renderCards() {
    return this.props.theFavs.map(beach => {
      return <BeachCard selectBeach={this.props.selectBeach} key={beach.name} beach={beach} />
    })
  }

  render () {
    console.log("favs stuff", this.props)
    return (
      <div className="FavContainer">
        {this.renderCards()}
      </div>

    )
  }
}

export default FavContainer;
