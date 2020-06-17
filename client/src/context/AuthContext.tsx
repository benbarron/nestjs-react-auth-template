import React, { useReducer } from "react";
import axios, { AxiosResponse } from "axios";
import { API_HOST } from "./../env";
import { AuthReducer } from "./AuthReducer";
import { AuthState } from "./../utils/userTypes";
import { withRouter } from "react-router";

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: localStorage.getItem("refresh-token"),
  user: {},
};

export const AuthContext = React.createContext<AuthState>(initialState);

export const AuthProvider = withRouter(
  (props: any): JSX.Element => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const authTokenConfig = (): Object => {
      return {
        headers: {
          "access-token": state.accessToken,
          "refresh-token": state.refreshToken,
        },
      };
    };

    const checkForNewToken = (res: AxiosResponse<any>): void => {
      if (res.headers["new-access-token"]) {
        dispatch({
          type: "NEW_ACCESS_TOKEN",
          payload: { newAccessToken: res.headers["new-access-token"] },
        });
      }
    };

    const logout = (): void => {
      dispatch({ type: "LOGOUT" });
      props.history.push("/");
    };

    const setLoading = (value: boolean) => {
      dispatch({
        type: "SET_LOADING",
        payload: { value },
      });
    };

    const toggleDarkMode = async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const res: AxiosResponse<any> = await axios.post(
            `${API_HOST}/api/profile/dark-mode`,
            { newDarkModeValue: !state.user.darkMode },
            authTokenConfig()
          );
          dispatch({
            type: "SET_DARK_MODE",
            payload: { newDarkModeValue: !state.user.darkMode },
          });
          resolve(res);
        } catch (err) {
          if (err.response.status == 401) {
            logout();
          }
          reject(err);
        }
      });
    };

    const loadUser = (): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        dispatch({
          type: "LOADING_USER",
        });

        try {
          const res: any = await axios.get(
            `${API_HOST}/api/auth/user`,
            authTokenConfig()
          );
          checkForNewToken(res);
          dispatch({
            type: "USER_LOADED",
            payload: { user: res.data.user },
          });
          resolve(res);
        } catch (err) {
          logout();
          reject(err);
        }
      });
    };

    const register = (payload: Object): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          const res: AxiosResponse<any> = await axios.post(
            `${API_HOST}/api/auth/register`,
            payload
          );
          dispatch({
            type: "REGISTER_SUCCESS",
            payload: {
              user: res.data.user,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            },
          });
          resolve(res);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    };

    const login = (payload: Object): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post(`${API_HOST}/api/auth/login`, payload);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: res.data.user,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            },
          });
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    };

    const deleteAccount = (): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          const res: AxiosResponse<any> = await axios.delete(
            `${API_HOST}/api/auth/delete-account`,
            authTokenConfig()
          );
          resolve(res);
        } catch (err) {
          if (err.response.status == 401) {
            logout();
          }
          reject(err);
        }
      });
    };

    const updateProfileInfo = (payload: Object): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          const res: AxiosResponse<any> = await axios.post(
            `${API_HOST}/api/profile/info`,
            payload,
            authTokenConfig()
          );
          checkForNewToken(res);
          dispatch({
            type: "USER_UPDATED",
            payload: { user: res.data.user },
          });
          resolve(res);
        } catch (err) {
          if (err.response.status === 401) {
            logout();
          }
          reject(err);
        }
      });
    };

    const updateProfileImage = (payload: {
      formData: FormData;
    }): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          const res: AxiosResponse<any> = await axios.post(
            `${API_HOST}/api/profile/image`,
            payload.formData,
            authTokenConfig()
          );
          checkForNewToken(res);
          dispatch({
            type: "PROFILE_IMAGE_UPLOADED",
            payload: { newProfileImage: res.data.user.profileImage },
          });
          resolve(res);
        } catch (err) {
          if (err.response.status === 401) {
            logout();
          }
          reject(err);
        }
      });
    };

    const updatePassword = (payload: Object): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          const res: AxiosResponse<any> = await axios.post(
            `${API_HOST}/api/profile/password`,
            payload,
            authTokenConfig()
          );
          resolve(res);
        } catch (err) {
          if (err.response.status === 401) {
            logout();
          }
          reject(err);
        }
      });
    };

    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          isLoading: state.isLoading,
          refreshToken: state.refreshToken,
          accessToken: state.accessToken,
          updateProfileInfo,
          updateProfileImage,
          updatePassword,
          loadUser,
          register,
          login,
          logout,
          deleteAccount,
          setLoading,
          authTokenConfig,
          checkForNewToken,
          toggleDarkMode,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }
);
