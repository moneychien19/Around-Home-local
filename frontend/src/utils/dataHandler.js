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

export async function dataHandler(fetchData, dispatch) {
  AQIDataHandler(fetchData.resAQI, dispatch);
  UVDataHandler(fetchData.resUV, dispatch);
  greenHandler(fetchData.resGreen, dispatch);
  rewardHandler(fetchData.resReward, dispatch);
  garbageHandler(fetchData.resGarbage, dispatch);
  clothesHandler(fetchData.resClothes, dispatch);
  disposalHandler(fetchData.resDisposal, dispatch);
  theftDataHandler(fetchData.resTheft, dispatch);
  accidentDataHandler(fetchData.resAccident, dispatch);
}

function AQIDataHandler(resAQI, dispatch) {
  let tempAQI = [
    "空氣品質指標AQI",
    resAQI["scounty"] + "-" + resAQI["sname"],
    resAQI["published_time"],
    resAQI["aqi"],
    resAQI["status"],
  ];
  dispatch(mutateAQI(tempAQI));
}

function UVDataHandler(resUV, dispatch) {
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

function theftDataHandler(resTheft, dispatch) {
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

function accidentDataHandler(resAccident, dispatch) {
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

function greenHandler(resGreen, dispatch) {
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

function rewardHandler(resReward, dispatch) {
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

function garbageHandler(resGarbage, dispatch) {
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

function clothesHandler(resClothes, dispatch) {
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

function disposalHandler(resDisposal, dispatch) {
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
