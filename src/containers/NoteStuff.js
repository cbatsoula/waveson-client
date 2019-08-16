import React from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';

class NoteStuff extends React.Component {

  state = {
    note: null,
    allNotes: null,
  }


  handleSubmit = (event) => {
    event.preventDefault();
    console.log("SUBMIT")
    let thisOne = this.props.allBeaches.find(beach => {
      return beach.name === this.props.currentBeach.name
    })
    fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        note: this.state.note,
        user_id: this.props.currentUser.id,
        beach_id: thisOne.id,
      })
    })
    .then( r => r.json())
    .then(console.log)

    this.setState({
      note: ""
    }, () => {this.fetchNotes()})
    console.log("thisOne", thisOne)
  }

  componentDidMount() {
    this.fetchNotes()
  }

  fetchNotes = () => {
    let thisOne = this.props.allBeaches.find(beach => {
      return beach.name === this.props.currentBeach.name
    })

    fetch('http://localhost:3000/notes')
      .then( r => r.json())
      .then( stuff => {
        let findFromNotes = stuff.filter( note => {
          return note.beach_id === thisOne.id})
        // console.log("pls", findFromNotes)
        // debugger;

        this.setState({
          allNotes: findFromNotes
        })

      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderNoteCards = () => {
    return this.state.allNotes.map( note => {
      return <NoteCard note={note} key={note.id} />
    })
  }

  render () {
    console.log("note", this.state)
    console.log("note props", this.props)
    return (
      <div className="Note-Container">
        Im a note container
        <form className="Note-Form" onSubmit={this.handleSubmit}>
          <br />
          <textarea onChange={this.handleChange} name="note" value={this.state.note} rows="4" cols="50" type="text" placeholder="Start your entry here!"/>
          <input type="submit" value="Submit" />
        </form>
      {
        this.state.allNotes
        ?
        this.renderNoteCards()
        :
        null
      }

      </div>
    )
  }
}
export default NoteStuff
