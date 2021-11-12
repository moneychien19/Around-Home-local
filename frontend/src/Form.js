import React, { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "./key";
import fetchTheft from "./fetchTheft";
import fetchAccident from "./fetchAccident";

const Form = ({
  showContent,
  setShowContent,
  lat,
  setLat,
  lng,
  setLng,
  setTheftRowData,
  setAccidentRowData,
  setTheftLoc,
  setAccidentLoc,
}) => {
  let [address, setAddress] = useState("");
  let [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  let [distanceRange, setDistanceRange] = useState("d500");
  let [timeRange, setTimeRange] = useState("t1");

  const inputHandler = (e) => {
    setAddress(e.target.value);
  };

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

  const submitHandler = (e) => {
    e.preventDefault();

    // set the url of Google map API
    setUrl(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        API_KEY
    );

    // set the range data
    setDistanceRange(
      e.target.parentElement.querySelector("div.range select#distanceRange")
        .value
    );
    setTimeRange(
      e.target.parentElement.querySelector("div.range select#timeRange").value
    );
  };

  // when the url changes, fetch the latitude and longitude of the address
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setLat(
          response.data["results"][0]["geometry"]["viewport"]["northeast"][
            "lat"
          ]
        );
        setLng(
          response.data["results"][0]["geometry"]["viewport"]["northeast"][
            "lng"
          ]
        );
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [url]);

  // when the address changes, call API
  useEffect(() => {
    // get "safety" data and set
    fetchTheft(lat, lng, setTheftRowData, setTheftLoc);
    fetchAccident(lat, lng, setAccidentRowData, setAccidentLoc);
  }, [lat, lng]);

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="addressTags">
        <label htmlFor="address">地址</label>
        <input
          type="text"
          id="address"
          name="inputAddress"
          value={address}
          onChange={inputHandler}
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
          <option value="500">五百公尺內</option>
          <option value="1000">一公里內</option>
          <option value="2000">兩公里內</option>
          <option value="5000">五公里內</option>
        </select>
        <label htmlFor="timeRange">時間範圍</label>
        <select name="timeRange" id="timeRange">
          <option value="1">一個月內</option>
          <option value="3">三個月內</option>
          <option value="6">半年內</option>
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
