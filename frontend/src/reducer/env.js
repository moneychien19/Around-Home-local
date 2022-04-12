const initState = {
  AQI: ["空氣品質指標AQI", "", "", "", ""],
  UV: ["紫外線指數", "", "", "", ""],
};

export const envReducer = (state = initState, action) => {
  switch (action.type) {
    case "MUTATE_AQI":
      return {
        ...state,
        AQI: action.payload.AQI,
      };
    case "MUTATE_UV":
      return {
        ...state,
        UV: action.payload.UV,
      };
    default:
      return state;
  }
};
