import React from "react";
import "./Marker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Marker = ({ id }) => {
  return (
    <FontAwesomeIcon
      icon={faMapMarkerAlt}
      className="marker"
      id="query"
      size="3x"
    />
  );
};

export default Marker;
