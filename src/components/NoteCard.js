import React from 'react';

class NoteCard extends React.Component {

  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(this.props.note.created_at).toLocaleString([],options);

  }


  renderTags = () => {
    // console.log(this.props)
    if (this.props.note.tags) {
      return this.props.note.tags.map(tag => {
        return tag.tag
      })
    }
  }

  render () {
    // console.log(" note card props ", this.props)
    return (
      <div className="Note-Card">
        <div className="Note-Text">
        <p>{this.props.note.note}</p>

        <p>{this.formatDate()}</p>
        <p>Tags: {this.renderTags()}</p>
        </div>

        <button classname="button" onClick={() => {this.props.handleDelete(this.props.note)}}>Delete Entry</button>
        <button classname="button" onClick={() => {this.props.handleEdit(this.props.note)}}>Edit Entry</button>

      </div>
    )
  }

}
export default NoteCard
