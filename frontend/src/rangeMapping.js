const distanceMapping = (distanceRange) => {
  if (distanceRange === "250") {
    return "250公尺";
  } else if (distanceRange === "500") {
    return "500公尺";
  } else {
    return String(Number(distanceRange) / 1000) + "公里";
  }
};

const timeMapping = (timeRange) => {
  if (timeRange === "1") {
    return "一個月";
  } else if (timeRange === "3") {
    return "三個月";
  } else if (timeRange === "6") {
    return "半年";
  } else if (timeRange === "12") {
    return "一年";
  }
};

export { distanceMapping, timeMapping };
