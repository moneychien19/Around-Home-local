import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// Map
function Map({ lat, lng }) {
  let mapZoom = 17;
  let apiKey = "AIzaSyAZiSDS9dGBypZ47A4HrwPZf-fMdJ66faQ";

  return (
    <div className="card" id="map">
      <div style={{ width: "100%", height: "100%", padding: "0.6rem" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          center={{ lat: lat, lng: lng }}
          defaultZoom={mapZoom}
        >
          {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;
