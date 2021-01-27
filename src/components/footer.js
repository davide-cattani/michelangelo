import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => (
  <div className="footer-text text-inverted-color-bw opacity-high has-text-centered mb-1">
    Made with <FaHeart size={"0.82em"} color="red"  style={{ verticalAlign: "middle" }} /> by{" "}
    <a href="http://www.lemurweb.dev">lemurweb</a>
  </div>
);

export default Footer;
