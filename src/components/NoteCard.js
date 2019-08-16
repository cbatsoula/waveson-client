import React from 'react';

function NoteCard(props) {

  return (
    <div className="Note-Card">
      {props.note.note}
      {props.note.created_at}
      NoTe CaRd
      <button onClick={() => {props.handleDelete(props.note)}}>Delete Entry</button>
      <button onClick={() => {props.handleEdit(props.note)}}>Edit Entry</button>

    </div>
  )
}
export default NoteCard
