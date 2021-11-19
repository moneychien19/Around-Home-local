import React from "react";
import "./Marker_Pin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const Pin = ({ id, title, add, name }) => {
  return (
    <div className="pin">
      <div className="tooltip">
        <h3>{title}</h3>
        <p>{add}</p>
        <p>{name}</p>
      </div>
      <FontAwesomeIcon icon={faMapPin} id={id} size="2x" />
    </div>
  );
};

export default Pin;
