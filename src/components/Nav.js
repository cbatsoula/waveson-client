import React from 'react';
import { Link } from 'react-router-dom'

class Nav extends React.Component {


  render() {
    return (
      <div className="Nav">
        {this.props.currentUser ? <Link to="/home" style={{ textDecoration: 'none', padding: 50 }}><h3 className="logo">WavesOn</h3></Link> : <h3 style={{ textDecoration: 'none', padding: 50 }} className="logo">WavesOn</h3>}
        <div className="Nav-bttns">

          {this.props.currentUser ? null : <Link to="/login" style={{ textDecoration: 'none' }}><button>LOG IN</button></Link>}
          {this.props.currentUser ? <button onClick={this.props.logout}>LOG OUT</button> : null}
          {this.props.currentUser ? null : <Link to="/signup" style={{textDecoration: 'none'}}><button>SIGN UP</button></Link>}
        </div>

      </div>
    );
  }

}

export default Nav;
