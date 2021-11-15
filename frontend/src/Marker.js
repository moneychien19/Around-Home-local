import React from "react";
import "./Marker_Pin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Marker = ({ id }) => {
  return (
    <FontAwesomeIcon
      icon={faMapMarkerAlt}
      className="marker"
      id={id}
      size="3x"
    />
  );
};

export default Marker;
