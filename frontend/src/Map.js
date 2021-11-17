import React from "react";
import GoogleMapReact from "google-map-react";
import API_KEY from "./key";
import Marker from "./Marker";
import Pin from "./Pin";

// Map
function Map({
  lat,
  lng,
  greenResLoc,
  greenStoreLoc,
  rewardResLoc,
  rewardStoreLoc,
  garbageLoc,
  clothesLoc,
  disposalLoc,
  theftLoc,
  accidentLoc,
  distanceRange,
}) {
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
          {!greenResLoc
            ? null
            : greenResLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="greenPin" />
              ))}
          {!greenStoreLoc
            ? null
            : greenStoreLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="greenPin" />
              ))}
          {!rewardResLoc
            ? null
            : rewardResLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="greenPin" />
              ))}
          {!rewardStoreLoc
            ? null
            : rewardStoreLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="greenPin" />
              ))}
          {!garbageLoc
            ? null
            : garbageLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="garbagePin" />
              ))}
          {!clothesLoc
            ? null
            : clothesLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="garbagePin" />
              ))}
          {!disposalLoc
            ? null
            : disposalLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="garbagePin" />
              ))}
          {!theftLoc
            ? null
            : theftLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="theftPin" />
              ))}
          {!accidentLoc
            ? null
            : accidentLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="accidentPin" />
              ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;
