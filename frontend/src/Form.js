import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({
  showContent,
  setShowContent,
  lat,
  setLat,
  lng,
  setLng,
  setTheftRowData,
  setAccidentRowData,
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
    // console.log(showContent, address);
    // set the url of Google map API
    setUrl(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=AIzaSyAZiSDS9dGBypZ47A4HrwPZf-fMdJ66faQ"
    );

    // set the range data
    setDistanceRange(
      e.target.parentElement.querySelector("div.range select#distanceRange")
        .value
    );
    setTimeRange(
      e.target.parentElement.querySelector("div.range select#timeRange").value
    );

    // get "safety" data
    fetch("http://localhost:8000/api/safety%20theft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch theft data");
        }
        return res.json();
      })
      .then((data) => {
        let tempTheft = {
          自行車竊盜: 0,
          機車竊盜: 0,
          汽車竊盜: 0,
          住宅竊盜: 0,
          強盜: 0,
          搶奪: 0,
        };
        for (let i = 0; i < data.length; i++) {
          tempTheft[data[i]["theft_type"]] += 1;
        }
        setTheftRowData(tempTheft);
      })
      .catch((err) => {
        setError(err);
      });
    fetch("http://localhost:8000/api/safety%20accident", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch accident data");
        }
        return res.json();
      })
      .then((data) => {
        let tempAccident = { 交通事故: data.length };
        setAccidentRowData(tempAccident);
      })
      .catch((err) => {
        setError(err);
      });
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
          <option value="d500">五百公尺內</option>
          <option value="d1000">一公里內</option>
          <option value="d2000">兩公里內</option>
          <option value="d5000">五公里內</option>
        </select>
        <label htmlFor="timeRange">時間範圍</label>
        <select name="timeRange" id="timeRange">
          <option value="t1">一個月內</option>
          <option value="t3">三個月內</option>
          <option value="t6">半年內</option>
          <option value="t12">一年內</option>
        </select>
      </div>
      <button className="submit" type="submit">
        查詢
      </button>
    </form>
  );
};

export default Form;
