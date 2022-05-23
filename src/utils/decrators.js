export function mapDispatchToProps(dispatch) {
  return {
    sendAction: () => {
      dispatch({
        type: "send_test",
      });
    },
  };
}

export function reciveDataFromState(state) {
  console.log(state);
  return state;
}
