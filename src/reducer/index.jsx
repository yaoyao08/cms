const initState = {
  count: 0,
};

export function reducer(state = initState, action) {
  console.log(action);
  switch (action.type) {
    case "test":
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
}
