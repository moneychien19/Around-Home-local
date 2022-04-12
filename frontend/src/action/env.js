export const mutateAQI = (AQI) => ({
  type: "MUTATE_AQI",
  payload: {
    AQI: AQI,
  },
});

export const mutateUV = (UV) => ({
  type: "MUTATE_UV",
  payload: {
    UV: UV,
  },
});
