import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import MainContainer from './containers/MainContainer';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Show from './containers/Show';
import Map from './components/Map';


// import { Link } from 'react-router-dom';
  //find exactly what headers google wants to fully fix this
  // const API = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLng}&radius=20000&type=natural_feature&keyword=beach&key=AIzaSyDA0kZdff9Oi6T6PM7nKwVG92c3uELsbRE`
  const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`


class App extends React.Component {

  state = {
    beachData: [],
    userLoc: {},
    currentUser: null,
    currentBeach: null,
    allBeaches: [],
  }

  selectBeach = (propsName) => {
    console.log("HELL YEAH", propsName)
    console.log("why", this.state)
    let selectedBeach = this.state.beachData.results.find(beach => {
      return beach.name === propsName
    })
    this.setState({
      currentBeach: selectedBeach
    }, () => {this.props.history.push('/beach')})

  }

  componentDidMount() {

    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
      method: "POST"
    })
      .then(r => r.json())
      .then(data => {
        console.log(process.env.REACT_APP_GOOGLE_API_KEY)
        this.setState({
          userLoc: data.location
        }, () => {this.beachesFromUserLoc()})
      })
    fetch('http://localhost:3000/beaches')
      .then( r => r.json())
      .then( allBeaches => {
        this.setState({
          allBeaches: allBeaches
        })
      })
  }

  beachesFromUserLoc() {
    let userLat = this.state.userLoc.lat.toString()
    let userLng = this.state.userLoc.lng.toString()
    // fetch('http://localhost:3000/users/1', {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   body: JSON.stringify({
    //     location: this.state.userLoc
    //   })
    // })
    //   .then(r => r.json())
    //   .then(data => {
    //     console.log("patch location", data)
    //   })
    //
    // console.log("uh", userLat, userLng)
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLng}&radius=21000&type=natural_feature&keyword=beach&key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then(r => r.json())
      .then(data => {
        this.setState({
          beachData: data
        }, () => {this.postBeaches()})
      })
  }

  postBeaches() {
    // let beachLat = this.state.beachData.results.map(beach => {
    //   return beach.geometry.location.lat.toString()
    // })
    // let beachLng = this.state.beachData.results.map(beach => {
    //   return beach.geometry.location.lng.toString()
    // })
    // let beachIndex = this.state.beachData.results.map((beach, index) => {
    //   return index + 1
    // })
    // console.log("post beaches", beachLat, beachIndex)


    this.state.beachData.results.map(beach => {
      return fetch('http://localhost:3000/beaches', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        name: beach.name,
        lat: beach.geometry.location.lat,
        vicinity: beach.vicinity,
        lng: beach.geometry.location.lng
      })
    })
      .then(r => r.json())
      .then(console.log)
    })
  }

  signUpUser = (input) => {
    if (input.password === input.passwordConfirmation) {
      fetch('http://localhost:3000/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          username: input.username,
          password: input.password
        })
      })
      .then(r => r.json())
      .then(response => {
        if (response.errors){
          alert(response.errors)
        } else {
          // this.setState({
          //   currentUser: {...response},
          // })
          this.setUser(response)
        }
      })
    } else {
      alert("Passwords don't match!")
    }

  }

  hideNseek() {
    if (!this.state.beachData.results) {
      console.log("not yet", this.state)
    } else if (this.state.currentBeach) {
      return <Route path='/beach' render={(routerProps) => <Show currentBeach={this.state.currentBeach}/>} />

    }
    // else if (this.state.beachData.results.length > 1) {
    //   console.log("HIDE AND SEEK", this.state.beachData.results.length)
    //   return <Route path='/home' render={(routerProps) => <MainContainer selectBeach={this.selectBeach} beachData={this.state.beachData.results} />} />
    //
    // }
  }

  loginUser = (input) => {
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        username: input.username,
        password: input.password
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        this.setState({
          currentUser: response,
          // loading: false
        }, () => {this.props.history.push('/home')})
      }
    })
  }

  setUser = (response) => {
    this.setState({
      currentUser: response
    }, () => {
      // console.log("THIS!!!!!", this.props)
      // localStorage.token = response.token
      this.props.history.push("/home")
    })
  }

  holdThis = () => {
    // {
    //   this.state.currentBeach
    //   ?
    //   <Show currentBeach={this.state.currentBeach}/>
    //   :
    //   this.hideNseek()
    // }
  }



  render() {
    console.log("app", this.state)
    // console.log("beach info", this.state.beachData.results)
    return (

        <div className="App">
          <Nav currentUser={this.state.currentUser} />
          <Switch>

            <Route path='/signup' render={() => <SignUp setUser={this.setUser} signUpUser={this.signUpUser}/>} />
            <Route path="/login" render={(routerProps) => <Login {...routerProps} loginUser={this.loginUser}/>} />
            <Route path='/map' component={Map} />
            <Route path='/beach' render={(routerProps) => <Show {...routerProps} currentBeach={this.state.currentBeach} currentUser={this.state.currentUser} allBeaches={this.state.allBeaches}/>} />



          </Switch>
          <Route exact path='/home' render={(routerProps) => <MainContainer {...routerProps} selectBeach={this.selectBeach} beachData={this.state.beachData.results} allBeaches={this.state.allBeaches} />} />

        </div>

    );
  }

}

export default App;
