import React from 'react'

class Banner extends React.Component {

  render () {

    return (
      <div className="Banner">
        {this.props.title}
      </div>

    )
  }
}

export default Banner;
