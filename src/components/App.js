/*
import React, { useState, useRef } from "react";
import ColorThief from "colorthief";
import ReactLoading from "react-loading";
import { usePalette, Palette } from "color-thief-react";
import { FiUpload } from "react-icons/fi";

import { invertColor } from "../utils/convertRgb";

import UploadContainer from "./uploadContainer";

function App() {
  const [image, setImage] = useState(`https://source.unsplash.com/random/`);
  // const { data, loading, error } = usePalette(image, 3, "hex", {
  //   crossOrigin: "",
  //   quality: 10,
  // });

  let imageDisplay = useRef(null)

  const colorSelectors = () => {
    document.documentElement.style.setProperty(
      "--first-selector-color",
      data[0]
    );
    document.documentElement.style.setProperty(
      "--second-selector-color",
      data[1]
    );
    document.documentElement.style.setProperty(
      "--third-selector-color",
      data[2]
    );

    document.documentElement.style.setProperty(
      "--first-color-inverted",
      invertColor(data[0], true)
    );
    document.documentElement.style.setProperty(
      "--second-color-inverted",
      invertColor(data[1], true)
    );
    document.documentElement.style.setProperty(
      "--third-color-inverted",
      invertColor(data[2], true)
    );
  };

  const handleColorSelectorPressed = (color) => {
    switch (color) {
      case "first":
        document.documentElement.style.setProperty("--first-color", data[0]);
        document.documentElement.style.setProperty("--second-color", data[1]);
        document.documentElement.style.setProperty("--third-color", data[2]);
        break;
      case "second":
        document.documentElement.style.setProperty("--first-color", data[1]);
        document.documentElement.style.setProperty("--second-color", data[2]);
        document.documentElement.style.setProperty("--third-color", data[0]);
        break;
      case "third":
        document.documentElement.style.setProperty("--first-color", data[2]);
        document.documentElement.style.setProperty("--second-color", data[0]);
        document.documentElement.style.setProperty("--third-color", data[1]);
        break;
      case "light":
        document.documentElement.style.setProperty("--first-color", "#FEFEFE");
        document.documentElement.style.setProperty("--second-color", "#202020");
        document.documentElement.style.setProperty("--third-color", "#202020");
        break;
      case "dark":
        document.documentElement.style.setProperty("--first-color", "#202020");
        document.documentElement.style.setProperty("--second-color", "#FEFEFE");
        document.documentElement.style.setProperty("--third-color", "#FEFEFE");
        break;
    }
  };

  const handleFileUploaded = (event) => {
    console.log("file", event.target.files[0]);
    setImage(event.target.files[0]);
  };

  // if (loading || error) {
  //   return (
  //     <div className="loading">
  //       <ReactLoading
  //         type={"spokes"}
  //         color={"#0B5345"}
  //         height={"10vh"}
  //         width={"10vh"}
  //       />
  //       {loading && `Michelangelo is painting..`}
  //       {error && error}
  //     </div>
  //   );
  // }

  // if (data) {
    colorSelectors();
    handleColorSelectorPressed("first");
    return (
      <>
        <section className="hero is-fullheight">
          <div className="hero-head has-text-centered mt-3">
            <h1 className="header-text subtitle is-size-1 is-family-secondary">
              Michelangelo{" "}
              <span className="is-size-5 lemurweb is-family-primary">
                by <a href="https://www.lemurweb.dev">lemurweb</a>
              </span>
            </h1>
          </div>
          <div className="hero-body p-0">
            <div className="container">
              <UploadContainer />
              <div className="columns is-centered is-multiline is-mobile is-gapless mt-1 is-family-monospace is-uppercase is-size-7">
                {/* <div className="column is-12 m-4 is-narrow">
                  <div className="file is-centered">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="image"
                        onChange={event => handleFileUploaded(event)}
                      />
                      <span className="file-cta  has-text-centered">
                        <FiUpload />
                      </span>
                    </label>
                  </div>
                </div>
                <div className="column m-2 is-narrow ">
                  <div
                    className="selector first-color-selector"
                    onClick={() => handleColorSelectorPressed("first")}
                  >
                    {data[0]}
                  </div>
                </div>
                <div className="column m-2 is-narrow ">
                  <div
                    className="selector second-color-selector"
                    onClick={() => handleColorSelectorPressed("second")}
                  >
                    {data[1]}
                  </div>
                </div>
                <div className="column m-2 is-narrow ">
                  <div
                    className="selector third-color-selector"
                    onClick={() => handleColorSelectorPressed("third")}
                  >
                    {data[2]}
                  </div>
                </div>
                <div className="column m-2 is-narrow ">
                  <div
                    className="selector light-color-selector"
                    onClick={() => handleColorSelectorPressed("light")}
                  >
                    LIGHT
                  </div>
                </div>
                <div className="column m-2 is-narrow ">
                  <div
                    className="selector dark-color-selector"
                    onClick={() => handleColorSelectorPressed("dark")}
                  >
                    DARK
                  </div>
                </div>
                <div className="column is-12 has-text-centered my-6 px-4">
                  <img className="painting" src={image} />
                </div>
                <div className="column is-12 has-text-centered"></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  // }

}

export default App;
 */