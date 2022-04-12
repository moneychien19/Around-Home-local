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
import axios from "axios";
import API_KEY from "../key";
import { fetchAQI, fetchUV } from "../utils/fetchEnvironment";
import {
  fetchGreen,
  fetchGarbage,
  fetchClothes,
  fetchDisposal,
  fetchReward,
} from "../utils/fetchEco";
import { fetchTheft, fetchAccident } from "../utils/fetchSafety";
import { dataHandler } from "../utils/dataHandler";

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

  // when the address or ranges changes, call API
  useEffect(async () => {
    // get "env" data
    let resAQI = await fetchAQI(lat, lng);
    let resUV = await fetchUV(lat, lng);

    // get "eco" data
    let resGreen = await fetchGreen(lat, lng, distanceRange);
    let resReward = await fetchReward(lat, lng, distanceRange);
    let resGarbage = await fetchGarbage(lat, lng, distanceRange);
    let resClothes = await fetchClothes(lat, lng, distanceRange);
    let resDisposal = await fetchDisposal(lat, lng, distanceRange);

    // get "safety" data
    let resTheft = await fetchTheft(lat, lng, distanceRange, timeRange);
    let resAccident = await fetchAccident(lat, lng, distanceRange, timeRange);

    // integrate the data and put in the handler
    let fetchData = {
      resAQI: resAQI,
      resUV: resUV,
      resGreen: resGreen,
      resReward: resReward,
      resGarbage: resGarbage,
      resClothes: resClothes,
      resDisposal: resDisposal,
      resTheft: resTheft,
      resAccident: resAccident,
    };
    dataHandler(fetchData, dispatch);
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
