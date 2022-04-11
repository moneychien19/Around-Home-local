const initState = {
  theftDict: {
    自行車竊盜: 0,
    機車竊盜: 0,
    汽車竊盜: 0,
    住宅竊盜: 0,
    強盜: 0,
    搶奪: 0,
  },
};

const otherReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default otherReducer;
