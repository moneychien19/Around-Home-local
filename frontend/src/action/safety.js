export const mutateTheftCount = (theftCount) => ({
  type: "MUTATE_THEFT_COUNT",
  payload: {
    theftCount: theftCount,
  },
});

export const mutateTheftLoc = (theftLoc) => ({
  type: "MUTATE_THEFT_LOC",
  payload: {
    theftLoc: theftLoc,
  },
});

export const mutateAccidentCount = (accidentCount) => ({
  type: "MUTATE_ACCIDENT_COUNT",
  payload: {
    accidentCount: accidentCount,
  },
});

export const mutateAccidentLoc = (accidentLoc) => ({
  type: "MUTATE_ACCIDENT_LOC",
  payload: {
    accidentLoc: accidentLoc,
  },
});
