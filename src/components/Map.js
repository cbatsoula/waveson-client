import React from 'react'

class Map extends React.Component {

  render () {

    return (
      <div className="Map">
        <div className="Map">
        <h1>Basic example</h1>
        <div id="map"></div>

        <p><b>Address</b>: <span id="address"></span></p>
        <p id="error"></p>
        </div>
      </div>

    )
  }
}

export default Map;
