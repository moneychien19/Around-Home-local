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

const Form = ({
  setGreenResLoc,
  setGreenResRowData,
  setGreenStoreLoc,
  setGreenStoreRowData,
  setRewardResLoc,
  setRewardResRowData,
  setGarbageRowData,
  setGarbageLoc,
  setClothesRowData,
  setClothesLoc,
  setDisposalRowData,
  setDisposalLoc,
  setTheftRowData,
  setAccidentRowData,
  setTheftLoc,
  setAccidentLoc,
}) => {
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
    return tempAQI;
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
    return tempUV;
  }

  // when the address or ranges changes, call API
  useEffect(async () => {
    // get "env" data and set
    let resAQI = await fetchAQI(lat, lng);
    dispatch(mutateAQI(AQIDataHandler(resAQI)));

    let resUV = await fetchUV(lat, lng);
    dispatch(mutateUV(UVDataHandler(resUV)));

    // get "eco" data and set
    fetchGreen(
      lat,
      lng,
      distanceRange,
      setGreenResLoc,
      setGreenResRowData,
      setGreenStoreLoc,
      setGreenStoreRowData
    );
    fetchReward(lat, lng, distanceRange, setRewardResLoc, setRewardResRowData);
    fetchGarbage(lat, lng, distanceRange, setGarbageRowData, setGarbageLoc);
    fetchClothes(lat, lng, distanceRange, setClothesRowData, setClothesLoc);
    fetchDisposal(lat, lng, distanceRange, setDisposalRowData, setDisposalLoc);

    // get "safety" data and set
    fetchTheft(
      lat,
      lng,
      distanceRange,
      timeRange,
      setTheftRowData,
      setTheftLoc
    );
    fetchAccident(
      lat,
      lng,
      distanceRange,
      timeRange,
      setAccidentRowData,
      setAccidentLoc
    );
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
