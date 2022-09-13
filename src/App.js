import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageSubmission from "./components/ImageSubmission/ImageSubmission.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Rank from "./components/Rank/Rank.js";
import Particle from "./components/Particles";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import Clarifai from 'clarifai';
import "./App.css"
import { Fragment } from "react/cjs/react.production.min.js";

//f336a0c62d9b4c53b4f7d1e0974a8a3f

const app = new Clarifai.App({
  apiKey: 'f336a0c62d9b4c53b4f7d1e0974a8a3f'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: 'signin', // default starting route
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joinedDate: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joinedDate: data.joinedDate
      }
    })
  }

  componentDidMount() {
    fetch('http://localhost:3001')
      .then(response => response.json())
      .then(console.log)
  }

  calculateFaceLocation = (response) => {
    const clarifaiFaceData = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const hieght = Number(image.height);

    return {
      leftCol: clarifaiFaceData.left_col * width,
      topRow: clarifaiFaceData.top_row * hieght,
      rightCol: width - (clarifaiFaceData.right_col * width),
      bottomRow: hieght - (clarifaiFaceData.bottom_row * hieght)
    }
  }

  displayFaceArea = (box) => {
    this.setState({ box: box });
  }

  onInputChnage = (event) => {
    this.setState({ input: event.target.value, box: {}, imageURL: "" })
  }

  onClickSearch = () => {
    this.setState({ imageURL: this.state.input })
    console.log(this.state.input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        this.displayFaceArea(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState({ isSignedIn: false })
    } else {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { imageURL, box, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
        <Particle />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          route === 'home' ?
            <Fragment>
              < Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageSubmission onInputChnage={this.onInputChnage} onClickSearch={this.onClickSearch} />
              <FaceRecognition imageURL={imageURL} box={box} />
            </Fragment> :
            (
              route === "signin" ?
                <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                :
                < Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }

      </div>
    )
  }
}

export default App