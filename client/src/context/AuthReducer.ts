import { AuthState } from "../utils/userTypes";

export const AuthReducer = (state: any, action: any): AuthState => {
  switch (action.type) {
    case "LOADING_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGOUT":
      localStorage.removeItem("refresh-token");
      return {
        ...state,
        user: {},
        isLoading: false,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isAuthenticated: true,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("refresh-token", action.payload.refreshToken);
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isLoading: false,
        isAuthenticated: true,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload.value,
      };
    case "PROFILE_IMAGE_UPLOADED":
      return {
        ...state,
        user: {
          ...state.user,
          profileImage: action.payload.newProfileImage,
        },
      };
    case "NEW_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload.newAccessToken,
      };
    case "USER_UPDATED":
      return {
        ...state,
        user: action.payload.user,
      };
    case "SET_DARK_MODE":
      return {
        ...state,
        user: {
          ...state.user,
          darkMode: action.payload.newDarkModeValue,
        },
      };
    default:
      return state;
  }
};
