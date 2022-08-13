import React, { Component } from "react";
import Login from "./components/Login/Login.js";
import Logo from "./components/Logo/Logo.js";

class App extends Component {
  render() {
    return (
      <div>
        <Login></Login>
        <Logo></Logo>
        {/* <ImageSubmission></ImageSubmission>
        <FaceRecognition></FaceRecognition> */}

      </div>
    )
  }
}

export default App