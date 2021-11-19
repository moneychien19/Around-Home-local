import React from "react";
import "./Marker_Pin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Marker = ({ id, content }) => {
  return (
    <div className="marker">
      <div className="tooltip">
        <h3>{content}</h3>
      </div>
      <FontAwesomeIcon icon={faMapMarkerAlt} id={id} size="3x" />
    </div>
  );
};

export default Marker;
