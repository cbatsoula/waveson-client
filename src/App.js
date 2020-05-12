import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Loader from './components/Loader'
import './App.css';
import Nav from './components/Nav';
import MainContainer from './containers/MainContainer';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Show from './containers/Show';
import Map from './components/Map';
import AllNotes from './containers/AllNotes';




class App extends React.Component {

  state = {
    beachData: null,
    userLoc: {},
    currentUser: null,
    currentBeach: null,
    allBeaches: [],
    allNotes: null,
    beachSaveData: null,
    theFavs: null,
  }


  fetchNotes = () => {
    // let thisOne = this.state.allBeaches.find(beach => {
    //   return beach.name === this.state.currentBeach.name
    // })
    fetch('http://localhost:3000/notes')
      .then( r => r.json())
      .then( stuff => {
          let findFromNotes = stuff.filter( note => {
            return note.user_id === this.state.currentUser.id

            //from this container of notes I want to only display the notes with the note.user_id to be equal === to whoever is currentUser.id
          })
          // console.log("pls", findFromNotes)
          // console.log("userID", userID)
        console.log("APP FETCH NOTES----------", findFromNotes)
        this.setState({
          allNotes: findFromNotes
        })

      })
    // let userID = this.state.currentUser.id
    // fetch('http://localhost:3000/notes')
    //   .then( r => r.json())
    //   .then( stuff => {
    //     let findFromNotes = stuff.filter( note => {
    //       return note.user_id === userID})
    //     console.log("pls", findFromNotes)
    //
    //
    //     this.setState({
    //       allNotes: findFromNotes
    //     }, () => {console.log("fetchNotes", findFromNotes)})
    //
    //   })
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

  fetchFavs = () => {
    fetch('http://localhost:3000/favs')
      .then( r => r.json())
      .then( data => {
        this.setState({
          beachSaveData: data
        }, () => this.doTheThing())
      })
  }

  componentDidMount() {

    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`, {
      method: "POST"
    })
      .then(r => r.json())
      .then(data => {
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


      this.fetchFavs()
  }

  beachesFromUserLoc() {
    let userLat = this.state.userLoc.lat.toString()
    let userLng = this.state.userLoc.lng.toString()

    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat},${userLng}&radius=21000&type=natural_feature&keyword=beach&key=${process.env.REACT_APP_GOOGLE_API_KEY}`, {
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
        }, () => {
          this.fetchNotes()

          this.props.history.push('/home')})
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


  logout = () => {
    this.setState({
      currentUser: null
    })
    this.props.history.push("/login")
   }

   doTheThing = () => {
     const finalArray = [];
     let arr1 = this.state.allBeaches.map(beach => {
       return beach
     })
     let arr2 = this.state.beachSaveData.map(fav => {
       return fav
     })

     // debugger
     if (this.state.currentUser){
       let userID = this.state.currentUser.id
       arr1.forEach((e1) => arr2.forEach((e2) =>
         {if (e1.id === e2.beach_id && userID === e2.user_id ){
           // debugger;
           finalArray.push(e1)
         }
       }
     ))
     return finalArray
     // console.log("final array", finalArray)
     console.log("NOW")
     this.setState({
       theFavs: finalArray
     }, () => {console.log("NOW", this.state.theFavs)})
     }

   }


     saveBeach = () => {
       console.log("you got this!", this.state.currentUser, this.state.currentBeach)

       let thisOne = this.state.allBeaches.find(beach => {
         return beach.name === this.state.currentBeach.name
       })

       let userID = this.state.currentUser.id
       console.log("save beach", thisOne)
       let favCheck = this.doTheThing().find(beach => {return beach.id === thisOne.id})

       // let favCheck = this.state.beachSaveData.find(beach => {
       //   return beach.id === thisOne.id && beach.user_id === userID})

       console.log("wut", thisOne && !favCheck)
       // debugger;
       if (thisOne && !favCheck){
         fetch('http://localhost:3000/favs', {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "Accept": "application/json",
           },
           body: JSON.stringify({
             user_id: this.state.currentUser.id,
             beach_id: thisOne.id,
           })
         })
           .then(r => r.json())
           .then(data => {
             this.fetchFavs()
           })
       }
     }

     removeBeach = () => {
       console.log("remove", this.state.beachSaveData )
       let userID = this.state.currentUser.id
       let thisOne = this.state.allBeaches.find(beach => {
         return beach.name === this.state.currentBeach.name
       })
       let favID = this.state.beachSaveData.find(fav => {
         return fav.user_id === userID && fav.beach_id === thisOne.id
           // console.log("remove favID", favID)
         })

         fetch(`http://localhost:3000/favs/${favID.id}`, {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
             "Access-Control-Allow-Methods": "DELETE",
             "Access-Control-Allow-Origin": "http://localhost"
           //   "Accept": "application/json",
           },
         })
           .then(r => r.json())
           .then(data => {
             this.fetchFavs()
           })
       }


  render() {
    console.log("app", this.state.allNotes)
    // console.log("beach info", this.state.beachData.results)
    return (

        <div className="App">
          <Nav logout={this.logout} currentUser={this.state.currentUser} />

          <Switch>

            <Route path='/signup' render={() => <SignUp setUser={this.setUser} signUpUser={this.signUpUser}/>} />
            {
              this.state.beachData
              ?
              <Route path="/login" render={(routerProps) => <Login {...routerProps} loginUser={this.loginUser} beachData={this.state.beachData}/>} />
              :
              <>
              <div className="Space" />
              <div className="Loader"/>
              </>
            }

            <Route path='/map' component={Map} />
            <Route path='/beach' render={(routerProps) => <Show {...routerProps} currentBeach={this.state.currentBeach} currentUser={this.state.currentUser} allBeaches={this.state.allBeaches} beachSaveData={this.state.beachSaveData} doTheThing={this.doTheThing} theFavs={this.doTheThing()} saveBeach={this.saveBeach} removeBeach={this.removeBeach}/>}
             />

            <Route path='/loader' render={() => <Loader />} />

            <Route path="/notes" render={(routerProps) => <AllNotes {...routerProps} fetchNotes={this.fetchNotes} currentUser={this.state.currentUser} allNotes={this.state.allNotes} />} />

          </Switch>
          <Route exact path='/home' render={(routerProps) => <MainContainer {...routerProps} selectBeach={this.selectBeach} beachData={this.state.beachData.results} allBeaches={this.state.allBeaches} beachSaveData={this.state.beachSaveData} currentUser={this.state.currentUser} doTheThing={this.doTheThing} theFavs={this.doTheThing()} />} />

        </div>

    );
  }

}

export default App;
