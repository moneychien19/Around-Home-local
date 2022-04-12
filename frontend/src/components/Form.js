import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  mutateAddress,
  mutateLat,
  mutateLng,
  mutateTimeRange,
  mutateDistanceRange,
  mutateShowContent,
} from "../action/input";
import { mutateAQI, mutateUV } from "../action/env";
import {
  mutateGreenStore,
  mutateGreenRes,
  mutateRewardRes,
  mutateGarbage,
  mutateClothes,
  mutateDisposal,
} from "../action/eco";
import {
  mutateTheftCount,
  mutateTheftLoc,
  mutateAccidentCount,
  mutateAccidentLoc,
} from "../action/safety";
import axios from "axios";
import API_KEY from "../key";
import { fetchAQI, fetchUV } from "../fetch/fetchEnvironment";
import {
  fetchGreen,
  fetchGarbage,
  fetchClothes,
  fetchDisposal,
  fetchReward,
} from "../fetch/fetchEco";
import { fetchTheft, fetchAccident } from "../fetch/fetchSafety";

const Form = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.inputReducer.address);
  const lat = useSelector((state) => state.inputReducer.lat);
  const lng = useSelector((state) => state.inputReducer.lng);
  const timeRange = useSelector((state) => state.inputReducer.timeRange);
  const distanceRange = useSelector(
    (state) => state.inputReducer.distanceRange
  );
  const showContent = useSelector((state) => state.inputReducer.showContent);

  const [inputAddress, setInputAddress] = useState(address);

  const onclickEnvironment = (e) => {
    e.preventDefault();
    e.target.classList.toggle("checked");
    determineShow(0);
  };
  const onclickEco = (e) => {
    e.preventDefault();
    e.target.classList.toggle("checked");
    determineShow(1);
  };
  const onclickSafety = (e) => {
    e.preventDefault();
    e.target.classList.toggle("checked");
    determineShow(2);
  };

  const determineShow = (index) => {
    let tempShowContent;
    if (showContent[index] === false) {
      tempShowContent = JSON.parse(JSON.stringify(showContent));
      tempShowContent[index] = true;
    } else {
      tempShowContent = JSON.parse(JSON.stringify(showContent));
      tempShowContent[index] = false;
    }
    dispatch(mutateShowContent(tempShowContent));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(mutateAddress(inputAddress));
    dispatch(
      mutateDistanceRange(
        e.target.parentElement.querySelector("div.range select#distanceRange")
          .value
      )
    );
    dispatch(
      mutateTimeRange(
        e.target.parentElement.querySelector("div.range select#timeRange").value
      )
    );

    await axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          inputAddress +
          "&key=" +
          API_KEY
      )
      .then((res) => {
        dispatch(
          mutateLat(
            res.data["results"][0]["geometry"]["viewport"]["northeast"]["lat"]
          )
        );
        dispatch(
          mutateLng(
            res.data["results"][0]["geometry"]["viewport"]["northeast"]["lng"]
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function AQIDataHandler(resAQI) {
    let tempAQI = [
      "空氣品質指標AQI",
      resAQI["scounty"] + "-" + resAQI["sname"],
      resAQI["published_time"],
      resAQI["aqi"],
      resAQI["status"],
    ];
    dispatch(mutateAQI(tempAQI));
  }

  function UVDataHandler(resUV) {
    let status = "";
    let uvi = resUV[resUV.length - 1]["uvi"];
    if (uvi <= 2) {
      status = "低量級";
    } else if ((uvi >= 3) & (uvi <= 5)) {
      status = "中量級";
    } else if ((uvi >= 6) & (uvi <= 7)) {
      status = "高量級";
    } else if ((uvi >= 8) & (uvi <= 10)) {
      status = "過量級";
    } else {
      status = "危量級";
    }
    let tempUV = [
      "紫外線指數",
      resUV[resUV.length - 1]["county"] +
        "-" +
        resUV[resUV.length - 1]["site_name"],
      resUV[resUV.length - 1]["utime"],
      uvi,
      status,
    ];
    dispatch(mutateUV(tempUV));
  }

  function theftDataHandler(resTheft) {
    let tempTheft = {
      自行車竊盜: 0,
      機車竊盜: 0,
      汽車竊盜: 0,
      住宅竊盜: 0,
      強盜: 0,
      搶奪: 0,
    };
    let tempLoc = [];
    for (let i = 0; i < resTheft.length || 0; i++) {
      tempTheft[resTheft[i]["theft_type"]] += 1;
      tempLoc.push([
        resTheft[i]["latitude"],
        resTheft[i]["longitude"],
        resTheft[i]["theft_add"],
        resTheft[i]["date"],
        resTheft[i]["theft_type"],
      ]);
    }
    dispatch(mutateTheftCount(tempTheft));
    dispatch(mutateTheftLoc(tempLoc));
  }

  function accidentDataHandler(resAccident) {
    let tempAccident = { 交通事故: resAccident.length || 0 };
    let tempLoc = [];
    for (let i = 0; i < resAccident.length || 0; i++) {
      tempLoc.push([
        resAccident[i]["latitude"],
        resAccident[i]["longitude"],
        resAccident[i]["aadd"],
        resAccident[i]["date"],
      ]);
    }
    dispatch(mutateAccidentCount(tempAccident));
    dispatch(mutateAccidentLoc(tempLoc));
  }

  function greenHandler(resGreen) {
    let tempResLoc = [];
    let tempStoreLoc = [];
    for (let i = 0; i < resGreen.length || 0; i++) {
      if (resGreen[i]["store_type_id"] === 1) {
        tempResLoc.push([
          resGreen[i]["latitude"],
          resGreen[i]["longitude"],
          resGreen[i]["gsadd"],
          resGreen[i]["gsname"],
        ]);
      }
      if (resGreen[i]["store_type_id"] === 2) {
        tempStoreLoc.push([
          resGreen[i]["latitude"],
          resGreen[i]["longitude"],
          resGreen[i]["gsadd"],
          resGreen[i]["gsname"],
        ]);
      }
    }
    dispatch(mutateGreenRes(tempResLoc));
    dispatch(mutateGreenStore(tempStoreLoc));
  }

  function rewardHandler(resReward) {
    let tempResLoc = [];
    for (let i = 0; i < resReward.length || 0; i++) {
      if (resReward[i]["store_type_id"] === 1) {
        tempResLoc.push([
          resReward[i]["latitude"],
          resReward[i]["longitude"],
          resReward[i]["rname"],
          resReward[i]["discount"],
        ]);
      }
    }
    dispatch(mutateRewardRes(tempResLoc));
  }

  function garbageHandler(resGarbage) {
    let tempLoc = [];
    for (let i = 0; i < resGarbage.length || 0; i++) {
      tempLoc.push([
        resGarbage[i]["latitude"],
        resGarbage[i]["longitude"],
        resGarbage[i]["tadd"],
        resGarbage[i]["leaving"],
      ]);
    }
    dispatch(mutateGarbage(tempLoc));
  }

  function clothesHandler(resClothes) {
    let tempLoc = [];
    for (let i = 0; i < resClothes.length || 0; i++) {
      tempLoc.push([
        resClothes[i]["latitude"],
        resClothes[i]["longitude"],
        resClothes[i]["cadd"],
        resClothes[i]["agency_name"],
      ]);
    }
    dispatch(mutateClothes(tempLoc));
  }

  function disposalHandler(resDisposal) {
    let tempLoc = [];
    for (let i = 0; i < resDisposal.length || 0; i++) {
      tempLoc.push([
        resDisposal[i]["latitude"],
        resDisposal[i]["longitude"],
        resDisposal[i]["wadd"],
        resDisposal[i]["wname"],
      ]);
    }
    dispatch(mutateDisposal(tempLoc));
  }

  // when the address or ranges changes, call API
  useEffect(async () => {
    // get "env" data and set
    let resAQI = await fetchAQI(lat, lng);
    let resUV = await fetchUV(lat, lng);
    AQIDataHandler(resAQI);
    UVDataHandler(resUV);

    // get "eco" data and set
    let resGreen = await fetchGreen(lat, lng, distanceRange);
    let resReward = await fetchReward(lat, lng, distanceRange);
    let resGarbage = await fetchGarbage(lat, lng, distanceRange);
    let resClothes = await fetchClothes(lat, lng, distanceRange);
    let resDisposal = await fetchDisposal(lat, lng, distanceRange);
    greenHandler(resGreen);
    rewardHandler(resReward);
    garbageHandler(resGarbage);
    clothesHandler(resClothes);
    disposalHandler(resDisposal);

    // get "safety" data and set
    let resTheft = await fetchTheft(lat, lng, distanceRange, timeRange);
    let resAccident = await fetchAccident(lat, lng, distanceRange, timeRange);
    theftDataHandler(resTheft);
    accidentDataHandler(resAccident);
  }, [lat, lng, timeRange, distanceRange]);

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="addressTags">
        <label htmlFor="address">地址</label>
        <input
          type="text"
          id="address"
          name="inputAddress"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
      </div>
      <div className="conditionTags">
        <label htmlFor="condition">篩選類別</label>
        <button className="condition" onClick={onclickEnvironment}>
          環境指標
        </button>
        <button className="condition" onClick={onclickEco}>
          環保
        </button>
        <button className="condition" onClick={onclickSafety}>
          治安
        </button>
      </div>
      <div className="range">
        <label htmlFor="distanceRange">距離範圍</label>
        <select name="distanceRange" id="distanceRange">
          <option value="1000">一公里內</option>
          <option value="250">兩百五十公尺內</option>
          <option value="500">五百公尺內</option>
          <option value="2000">兩公里內</option>
        </select>
        <label htmlFor="timeRange">時間範圍</label>
        <select name="timeRange" id="timeRange">
          <option value="6">半年內</option>
          <option value="1">一個月內</option>
          <option value="3">三個月內</option>
          <option value="12">一年內</option>
        </select>
      </div>
      <button className="submit" type="submit">
        查詢
      </button>
    </form>
  );
};

export default Form;
