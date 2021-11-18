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
  garbageLoc,
  clothesLoc,
  disposalLoc,
  theftLoc,
  accidentLoc,
  distanceRange,
  hidePins,
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
          {!greenResLoc | hidePins["hideGreenRes"]
            ? null
            : greenResLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="greenPin" />
              ))}
          {!greenStoreLoc | hidePins["hideGreenStore"]
            ? null
            : greenStoreLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="greenPin" />
              ))}
          {!rewardResLoc | hidePins["hideRewardRes"]
            ? null
            : rewardResLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="greenPin" />
              ))}
          {!garbageLoc | hidePins["hideGarbage"]
            ? null
            : garbageLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="garbagePin" />
              ))}
          {!clothesLoc | hidePins["hideClothes"]
            ? null
            : clothesLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="garbagePin" />
              ))}
          {!disposalLoc | hidePins["hideDisposal"]
            ? null
            : disposalLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="garbagePin" />
              ))}
          {!theftLoc | hidePins["hideTheft"]
            ? null
            : theftLoc.map((aLoc) => (
                <Pin lat={aLoc[0]} lng={aLoc[1]} id="theftPin" />
              ))}
          {!accidentLoc | hidePins["hideAccident"]
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
