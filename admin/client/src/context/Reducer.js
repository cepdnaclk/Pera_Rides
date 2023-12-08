const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        admin: null,
        isFetching: true,
        isError: false,
      };
    case "LOGIN_SUCCESS":
      return {
        admin: action.payload,
        isFetching: false,
        isError: false,
      };
    case "LOGIN_FAILURE":
      return {
        admin: null,
        isFetching: false,
        isError: true,
      };
    case "LOGOUT":
      return {
        admin: null,
        isFetching: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default Reducer;
