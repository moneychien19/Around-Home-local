import React from "react";
import GoogleMapReact from "google-map-react";
import API_KEY from "./key";
import Marker from "./Marker";
import Pin from "./Pin";
import { Tooltip } from "antd";

// Map
function Map({ lat, lng, disposalLoc, theftLoc, accidentLoc, distanceRange }) {
  let apiKey = API_KEY;

  return (
    <div className="card" id="map">
      <div style={{ width: "100%", height: "100%", padding: "0.6rem" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          center={{ lat: lat, lng: lng }}
          zoom={Number(distanceRange) >= 1000 ? 14 : 16}
        >
          <Marker lat={lat} lng={lng} id="query" />
          {!disposalLoc
            ? null
            : disposalLoc.map((aLoc) => (
                // <Tooltip
                //   placement="topLeft"
                //   title="Prompt Text"
                //   arrowPointAtCenter
                // >
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="ecoPin" />
                // </Tooltip>
              ))}
          {!theftLoc
            ? null
            : theftLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="safetyPin" />
              ))}
          {!accidentLoc
            ? null
            : accidentLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="safetyPin" />
              ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;
