import React from "react";
import "./Marker_Pin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const Pin = ({ id }) => {
  return <FontAwesomeIcon icon={faMapPin} className="pin" id={id} size="2x" />;
};

export default Pin;
