import React from 'react';

function NoteCard(props) {

  return (
    <div className="Note-Card" onClick={null}>
      {props.note.note}
      {props.note.created_at}
      NoTe CaRd
    </div>
  )
}
export default NoteCard
