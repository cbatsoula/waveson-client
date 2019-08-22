import React from 'react';

const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`

class BeachCard extends React.Component {

  state = {
    address: null,
  }

  componentDidMount() {

    // console.log(this.props.beach)
    if (this.props.beach.place_id) {
      let placeID = this.props.beach.place_id
      // console.log("placeID", placeID)

      fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${API_KEY}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
        .then( r => r.json())
        .then( data => {
          // console.log("data", data)
          this.setState({
            address: data.result.formatted_address
          })
        })
    } else {
      // console.log("nah")
    }

  }


  render () {
    // console.log("beach card state", this.state)
    // console.log("beach card props", this.props)
    return (
      <div className="Beach-Card" onClick={() => {this.props.selectBeach(this.props.beach.name)}}>
        <ul className="nobull">
          <center style={{fontSize: 30}}>{this.props.beach.name}</center>
          {
            this.state.address
            ?
            <li>Address: {this.state.address}</li>
            :
            <li>⛱🛶🐠  ⛵️⚓️ 🌊🐟</li>
          }

        </ul>
      </div>
    )
  }

}
export default BeachCard
