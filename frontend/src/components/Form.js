import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mutateAddress, mutateLat, mutateLng } from "../action/input";
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
  showContent,
  setShowContent,
  distanceRange,
  setDistanceRange,
  timeRange,
  setTimeRange,
  setAQIRowData,
  setUVRowData,
  setWQIRowData,
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
    if (showContent[index] === false) {
      let tempShowContent = JSON.parse(JSON.stringify(showContent));
      tempShowContent[index] = true;
      setShowContent(tempShowContent);
    } else {
      let tempShowContent = JSON.parse(JSON.stringify(showContent));
      tempShowContent[index] = false;
      setShowContent(tempShowContent);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(mutateAddress(inputAddress));

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

    // set the range data
    setDistanceRange(
      e.target.parentElement.querySelector("div.range select#distanceRange")
        .value
    );
    setTimeRange(
      e.target.parentElement.querySelector("div.range select#timeRange").value
    );
  };

  // when the address or ranges changes, call API
  useEffect(() => {
    // get "environment" data and set
    fetchAQI(lat, lng, setAQIRowData);
    fetchUV(lat, lng, setUVRowData);
    // fetchWQI(lat, lng, setWQIRowData);

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
