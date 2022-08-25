import React from "react";
import "./ImageSubmission.css"

const ImageSubmission = ({ onInputChnage, onClickSearch }) => {
  let message = `Enter an image and it will hightlight all the human faces in the picture`

  return (
    <div>
      <p className="f3 center">
        {message}
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 form">
          <input type="text" className="f4 pa2 w-70 center" onChange={onInputChnage} />
          <button className="w-30 grow dib f3-ns pointer f4 link ph3 pv2 dib white bg-light-purple" onClick={onClickSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}

export default ImageSubmission

