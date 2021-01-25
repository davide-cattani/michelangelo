import React, { useState, useRef, useEffect } from "react";
import { usePalette } from "color-thief-react";
import ReactLoading from "react-loading";
import { FiUpload } from "react-icons/fi";

import { invertColor } from "../utils/convertRgb";
import ColorSelector from "./colorSelector";

const App = () => {
  const currentColor = useRef(null);
  const fileInput = useRef(null);
  const [image, setImage] = useState(`https://source.unsplash.com/random/`);
  const { data, loading, error } = usePalette(image, 3, "hex", {
    crossOrigin: "",
    quality: 10,
  });

  const setInitialColors = () => {
    console.log("set initial colors");

    if (!data || !data[0] || !data[1] || !data[2]) return;

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

    document.documentElement.style.setProperty("--first-color", data[0]);
    document.documentElement.style.setProperty("--second-color", data[1]);
    document.documentElement.style.setProperty("--third-color", data[2]);
  };

  const handleColorSelectorPressed = (event, color) => {
    event.preventDefault();

    console.log("color", color);

    switch (color) {
      case "first":
        setInitialColors();
        break;
      case "second":
        document.documentElement.style.setProperty("--first-color", data[1]);
        document.documentElement.style.setProperty("--second-color", data[2]);
        document.documentElement.style.setProperty("--third-color", data[0]);

        document.documentElement.style.setProperty(
          "--first-color-inverted",
          invertColor(data[1], true)
        );
        break;
      case "third":
        document.documentElement.style.setProperty("--first-color", data[2]);
        document.documentElement.style.setProperty("--second-color", data[0]);
        document.documentElement.style.setProperty("--third-color", data[1]);

        document.documentElement.style.setProperty(
          "--first-color-inverted",
          invertColor(data[2], true)
        );
        break;
      case "light":
        document.documentElement.style.setProperty("--first-color", "#FEFEFE");
        document.documentElement.style.setProperty("--second-color", "#202020");
        document.documentElement.style.setProperty("--third-color", "#202020");

        document.documentElement.style.setProperty(
          "--first-color-inverted",
          invertColor("#FEFEFE", true)
        );
        break;
      case "dark":
        document.documentElement.style.setProperty("--first-color", "#202020");
        document.documentElement.style.setProperty("--second-color", "#FEFEFE");
        document.documentElement.style.setProperty("--third-color", "#FEFEFE");

        document.documentElement.style.setProperty(
          "--first-color-inverted",
          invertColor("#202020", true)
        );
        break;
    }

    currentColor.current.innerText = document.documentElement.style.getPropertyValue(
      "--first-color"
    );
  };

  const handleFileUploaded = (event) => {
    console.log("file", event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setInitialColors();
  };

  const handleImageClicked = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  if (loading || error) {
    return (
      <div className="loading">
        <ReactLoading
          type={"spokes"}
          color={"#FEFEFE"}
          height={"10vh"}
          width={"10vh"}
        />
        {loading && `Michelangelo is painting..`}
        {error && error}
      </div>
    );
  }

  if (data) {
    console.log("data", data);

    setInitialColors();

    return (
      <section className="michelangelo hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            {/* top-level columns */}
            <div className="centered-content columns is-vcentered is-centered">
              <div className="column has-text-centered mt-3 header-text">
                <h1 className=" header-text subtitle is-size-2-mobile is-size-1-desktop is-family-secondary mb-0">
                  Michelangelo{" "}
                  <span className="is-size-6-mobile is-size-5-desktop lemurweb is-family-primary">
                    by <a href="https://www.lemurweb.dev">lemurweb</a>
                  </span>
                </h1>
                <p className="is-size-6 is-family-primary">
                  Cambia l'immagine toccandola
                </p>
                <p className="is-size-6 is-family-primary">
                  Cambia il colore di sfondo toccando uno dei 5 colori
                </p>
                <div className="file is-centered">
                  <label className="file-label is-invisible is-hidden">
                    <input
                      ref={fileInput}
                      className="file-input"
                      type="file"
                      name="image"
                      onChange={(event) => handleFileUploaded(event)}
                      
                    />
                    <span className="file-cta has-text-centered">
                      <FiUpload />
                    </span>
                  </label>
                </div>
                <div className="columns is-centered is-multiline is-mobile is-gapless mt-1 is-family-monospace is-uppercase is-size-7">
                  <div className="column m-2 is-narrow ">
                    <ColorSelector
                      color={"first"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column m-2 is-narrow ">
                    <ColorSelector
                      color={"second"}
                      display
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column m-2 is-narrow ">
                    <ColorSelector
                      color={"third"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column m-2 is-narrow ">
                    <ColorSelector
                      color={"light"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column m-2 is-narrow ">
                    <ColorSelector
                      color={"dark"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                </div>
              </div>
              <div className="column has-text-centered">
                <img
                  crossOrigin={"anonymous"}
                  src={image}
                  alt={"the image on the wall"}
                  className="painting is-clickable"
                  onClick={(event) => {
                    handleImageClicked(event);
                  }}
                />
                <p
                  ref={currentColor}
                  className="has-text-centered header-text is-family-monospace is-uppercase is-size-7 mt-3"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <div>LOADING</div>;
};

export default App;
