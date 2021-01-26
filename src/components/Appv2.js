import React, { useState, useRef, useEffect } from "react";
import { usePalette } from "color-thief-react";
import ReactLoading from "react-loading";
import { FiUpload } from "react-icons/fi";
import { GoInfo } from "react-icons/go";
import { IoReload } from "react-icons/io5";
import { HiColorSwatch } from "react-icons/hi";
import { ImUpload } from "react-icons/im";

import { invertColor } from "../utils/convertRgb";
import ColorSelector from "./colorSelector";

const App = () => {

  const [random, setRandom] = useState(500);

  const imageDefaultApi = `https://picsum.photos/seed/${random}/500`;

  const currentColor = useRef(null);
  const fileInput = useRef(null);
  // const [image, setImage] = useState(`https://source.unsplash.com/random/`);
  const [image, setImage] = useState(imageDefaultApi);
  const [showInfo, setShowInfo] = useState(false);
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

  const handleInfoButtonClicked = (event, set) => {
    event.preventDefault();
    setShowInfo(set);
  };

  const handleReloadButtonClicked = (event) => {
    event.preventDefault();
    setRandom(random+1);
    setImage(imageDefaultApi);
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
        <div
          className="info-button is-clickable header-text"
          onClick={(event) => handleInfoButtonClicked(event, true)}
        >
          <GoInfo className="is-size-3-mobile is-size-2-tablet is-size-1-desktop" />
        </div>
        <div
          className="reload-button is-clickable header-text"
          onClick={(event) => handleReloadButtonClicked(event)}
        >
          <IoReload className="is-size-3-mobile is-size-2-tablet is-size-1-desktop" />
        </div>
        <div className="hero-body">
          <div className="container">
            {/* top-level columns */}
            <div className="centered-content columns is-vcentered is-centered is-multiline">
              <div className="column has-text-centered mt-3 header-text is-12">
                <h1 className=" header-text subtitle is-size-2-mobile is-size-1-desktop is-family-secondary mb-0">
                  Michelangelo
                </h1>
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
                <div className="columns is-centered is-multiline is-mobile is-gapless mt-1 is-family-monospace is-uppercase is-size-7 mb-0 mt-2">
                  <div className="column mx-3 is-narrow ">
                    <ColorSelector
                      color={"first"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column mx-3 is-narrow ">
                    <ColorSelector
                      color={"second"}
                      display
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column mx-3 is-narrow ">
                    <ColorSelector
                      color={"third"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column mx-3 is-narrow ">
                    <ColorSelector
                      color={"light"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                  <div className="column mx-3 is-narrow ">
                    <ColorSelector
                      color={"dark"}
                      colorSelected={handleColorSelectorPressed}
                    />
                  </div>
                </div>
                <div
                  ref={currentColor}
                  className="has-text-centered header-text is-family-monospace is-uppercase is-size-7 mt-3"
                ></div>
              </div>
              <div className="column has-text-centered mt-4">
                <img
                  crossOrigin={"anonymous"}
                  src={image}
                  alt={"the image on the wall"}
                  className="painting is-clickable"
                  onClick={(event) => {
                    handleImageClicked(event);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {showInfo && (
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card px-5">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  <GoInfo style={{ verticalAlign: "bottom" }} /> Michelangelo
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={(event) => handleInfoButtonClicked(event, false)}
                ></button>
              </header>
              <section className="modal-card-body">
                <div className="content">
                  <p className="is-italic has-text-info is-size-7">
                    Questa webapp ti aiuta a trovare il giusto colore di sfondo,
                    scegliendo dalla paletta colori di un dipinto o foto.
                  </p>
                  <p className="is-italic has-text-info is-size-7">
                    I tuoi muri di casa saranno perfettamente abbinati ai tuoi
                    quadri!
                  </p>
                  <br />
                  <div className="has-text-centered has-text-success is-size-3">
                    <ImUpload style={{ verticalAlign: "middle" }} /> <br />
                  </div>
                  <p>
                    Tocca l'immagine per cambiarla, selezionandone una dal tuo
                    dispositivo. (non verrà salvata da nessuna parte)
                  </p>
                  <div className="has-text-centered has-text-success is-size-3">
                    <HiColorSwatch style={{ verticalAlign: "middle" }} /> <br />
                  </div>
                  <p>
                    Tocca i pulsanti colorati per cambiare il colore di sfondo.
                  </p>
                </div>
              </section>
              <footer className="modal-card-foot is-flex is-justify-content-center">
                <button
                  className="button is-success"
                  onClick={(event) => handleInfoButtonClicked(event, false)}
                >
                  OK
                </button>
              </footer>
            </div>
          </div>
        )}
      </section>
    );
  }

  return <div>LOADING</div>;
};

export default App;
