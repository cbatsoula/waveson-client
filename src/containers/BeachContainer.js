import React from 'react'
import BeachCard from '../components/BeachCard'

class BeachContainer extends React.Component {

  componentDidMount() {
    console.log("work ffs", this.props.beachData)
  }
  renderCards() {
    return this.props.beachData.map(beach => {
          return <BeachCard selectBeach={this.props.selectBeach} key={beach.name} beach={beach} />
        })
  }

  render () {
    console.log("beach container", this.props.beachData)
    return (
      <div className="Beach-Container">
      beach container
      {
        this.renderCards()
      }
      </div>
    )
  }
}

export default BeachContainer;
