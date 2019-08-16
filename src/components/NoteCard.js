import React from 'react';

function NoteCard(props) {

  return (
    <div className="Note-Card">
      <div className="Note-Text">
      {props.note.note}
      {props.note.created_at}
      </div>

      <button classname="button" onClick={() => {props.handleDelete(props.note)}}>Delete Entry</button>
      <button classname="button" onClick={() => {props.handleEdit(props.note)}}>Edit Entry</button>

    </div>
  )
}
export default NoteCard
