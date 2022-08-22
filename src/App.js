import React, { Component } from "react";
import Login from "./components/Login/Login.js";
import Logo from "./components/Logo/Logo.js";
import ImageSubmission from "./components/ImageSubmission/ImageSubmission.js";
import Rank from "./components/Rank/Rank.js";
import Particle from "./components/Particles";
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particle />
        <Login></Login>
        <Logo></Logo>
        <Rank></Rank>
        <ImageSubmission></ImageSubmission>
        {/* <FaceRecognition></FaceRecognition> */}

      </div>
    )
  }
}

export default App