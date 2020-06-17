export const LoadingReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        loading: action.payload.value,
      };
    default:
      return state;
  }
};
