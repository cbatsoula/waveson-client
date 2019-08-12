import React from 'react';

function BeachCard(props) {
  return (
    <div className="Beach-Card" onClick={() => {props.selectBeach(props.beach.name)}}>
      <p>{props.beach.name},
      {props.beach.vicinity},
      {props.beach.geometry.location.lat},
      {props.beach.geometry.location.lng}</p>
    </div>
  )
}
export default BeachCard
