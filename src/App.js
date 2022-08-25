import React, { Component } from "react";
import Login from "./components/Login/Login.js";
import Logo from "./components/Logo/Logo.js";
import ImageSubmission from "./components/ImageSubmission/ImageSubmission.js";
import Rank from "./components/Rank/Rank.js";
import Particle from "./components/Particles";
import "./App.css"

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: " ",
      imageURL: " ",
    }
  }

  onInputChnage = (event) => {
    console.log(event.target.value)
    this.setState({ input: event.target.value })
  }

  onClickSearch = () => {
    console.log("click")
  }

  render() {
    return (
      <div className="App">
        <Particle />
        <Login />
        <Logo />
        <Rank />
        <ImageSubmission onInputChnage={this.onInputChnage} onClickSearch={this.onClickSearch} />
        {/* <FaceRecognition></FaceRecognition> */}

      </div>
    )
  }
}

export default App