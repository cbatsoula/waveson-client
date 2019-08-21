import React from 'react';
import NoteCard from '../components/NoteCard';
import Banner from '../components/Banner';

class AllNotes extends React.Component {

  renderNoteCards = () => {
    return this.props.allNotes.map( note => {
      return <NoteCard note={note} key={note.id} />
    })
  }

  render () {
    console.log("AllNotes", this.props)
    return (
      <div className="Note-Container">
      <div className="Banner">
      <Banner title={"All Notes"} />
      </div>
        <>
        {
          this.props.allNotes
          ?
          this.renderNoteCards()
          :
          null
        }
        </>
      </div>

    )
  }
}

export default AllNotes;
