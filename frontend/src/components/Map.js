import React from "react";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import API_KEY from "../key";
import Marker from "./Marker";
import Pin from "./Pin";

// Map
function Map({
  greenResLoc,
  greenStoreLoc,
  rewardResLoc,
  garbageLoc,
  clothesLoc,
  disposalLoc,
  theftLoc,
  accidentLoc,
  hidePins,
}) {
  let apiKey = API_KEY;
  const address = useSelector((state) => state.inputReducer.address);
  const lat = useSelector((state) => state.inputReducer.lat);
  const lng = useSelector((state) => state.inputReducer.lng);
  const distanceRange = useSelector(
    (state) => state.inputReducer.distanceRange
  );

  return (
    <div className="card" id="map">
      <div style={{ width: "100%", height: "100%", padding: "0.6rem" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          center={{ lat: lat, lng: lng }}
          zoom={Number(distanceRange) >= 1000 ? 14 : 16}
        >
          <Marker
            lat={lat}
            lng={lng}
            id="query"
            content={"查詢地址：" + address}
          />

          {!greenResLoc | hidePins["hideGreenRes"]
            ? null
            : greenResLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="greenPin"
                  title="綠色友善餐廳"
                  add={aLoc[2]}
                  name={aLoc[3]}
                />
              ))}
          {!greenStoreLoc | hidePins["hideGreenStore"]
            ? null
            : greenStoreLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="greenPin"
                  title="綠色商店"
                  add={aLoc[2]}
                  name={aLoc[3]}
                />
              ))}
          {!rewardResLoc | hidePins["hideRewardRes"]
            ? null
            : rewardResLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="greenPin"
                  title="自備餐具優惠店家"
                  add={aLoc[2]}
                  name={aLoc[3]}
                />
              ))}
          {!garbageLoc | hidePins["hideGarbage"]
            ? null
            : garbageLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="garbagePin"
                  title="垃圾車停靠點"
                  add={aLoc[2]}
                  name={"離開時間：" + aLoc[3]}
                />
              ))}
          {!clothesLoc | hidePins["hideClothes"]
            ? null
            : clothesLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="garbagePin"
                  title="舊衣回收箱"
                  add={aLoc[2]}
                  name={aLoc[3]}
                />
              ))}
          {!disposalLoc | hidePins["hideDisposal"]
            ? null
            : disposalLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="garbagePin"
                  title="公民營廢棄物清除機構"
                  add={aLoc[2]}
                  name={aLoc[3]}
                />
              ))}
          {!theftLoc | hidePins["hideTheft"]
            ? null
            : theftLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="theftPin"
                  title={aLoc[4]}
                  add={aLoc[2]}
                  name={aLoc[3]}
                />
              ))}
          {!accidentLoc | hidePins["hideAccident"]
            ? null
            : accidentLoc.map((aLoc) => (
                <Pin
                  lat={aLoc[0]}
                  lng={aLoc[1]}
                  id="accidentPin"
                  title="交通事故"
                  add={aLoc[2]}
                  name={aLoc[3]}
                />
              ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;
