import React from "react";
import Tilt from 'react-parallax-tilt';
import "./Logo.css"
import AIImage from "./image/AI_Logo.png";

const Logo = () => {
  return (
    <div>
      <Tilt className="br2 shadow-2 imageStyle">
        <img src={AIImage} alt="banner logo"></img>
      </Tilt>
    </div>
  )
}

export default Logo;