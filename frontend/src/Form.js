import React from "react";

const Form = ({ showContent, setShowContent }) => {
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

  // when submitting, turn the address to 經緯度
  const submitHandler = (e) => {
    e.preventDefault();
    let address = e.target.parentElement.querySelector(
      "div.addressTags input"
    ).value;
    console.log(address);
    // getLatLngByAddr(address);
  };

  // let getLatLngByAddr = (address) => {
  //   var geocoder = new google.maps.Geocoder(); //定義一個Geocoder物件
  //   geocoder.geocode(
  //     { address: address }, //設定地址的字串
  //     function (results, status) {
  //       //callback function
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         //判斷狀態
  //         alert(results[0].geometry.location); //取得座標
  //       } else {
  //         alert("Error");
  //       }
  //     }
  //   );
  // };

  return (
    <form action="get" className="search">
      <div className="addressTags">
        <label htmlFor="address">地址</label>
        <input type="text" id="address" name="inputAddress" />
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
      <button className="submit" type="submit" onClick={submitHandler}>
        查詢
      </button>
    </form>
  );
};

export default Form;
