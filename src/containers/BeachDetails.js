import React from 'react';

class BeachDetails extends React.Component {
  state = {
    weather: []
  }

  componentDidMount() {

  }

  renderWeather = () => {


  }

  render () {
    // console.log("deets", this.props)
    return (
      <div className="Beach-Details">
        Today's High F:
        Today's High C:
        Today's Low F:
        Today's Low C:
        Sunset:
        Sunrise:
        Moonrise:
        Moonset:
        {
          this.renderWeather()
        }

      </div>
    )
  }
}

export default BeachDetails;
