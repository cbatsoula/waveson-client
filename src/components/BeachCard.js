import React from 'react';

function BeachCard(props) {
  return (
    <div className="Beach-Card" onClick={() => {props.selectBeach(props.beach.name)}}>
      {props.beach.name},
      {props.beach.vicinity}
    </div>
  )
}
export default BeachCard
