import React from "react";
import GoogleMapReact from "google-map-react";
import API_KEY from "./key";
import Marker from "./Marker";
import Pin from "./Pin";

// Map
function Map({ lat, lng, theftLoc, accidentLoc, distanceRange }) {
  let apiKey = API_KEY;

  return (
    <div className="card" id="map">
      <div style={{ width: "100%", height: "100%", padding: "0.6rem" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          center={{ lat: lat, lng: lng }}
          zoom={Number(distanceRange) >= 2000 ? 14 : 16}
        >
          <Marker lat={lat} lng={lng} id="query" />
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
