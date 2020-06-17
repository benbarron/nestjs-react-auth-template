import { AxiosResponse } from "axios";

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
  user: any | null | undefined;
  loadUser?: () => Promise<any>;
  register?: (payload: Object) => Promise<any>;
  login?: (payload: Object) => Promise<any>;
  logout?: () => void;
  deleteAccount?: () => Promise<any>;
  setLoading?: (value: boolean) => void;
  updateProfileImage?: (payload: any) => Promise<any>;
  updateProfileInfo?: (payload: any) => Promise<any>;
  updatePassword?: (payload: any) => Promise<any>;
  authTokenConfig?: () => Object;
  toggleDarkMode?: () => void;
  checkForNewToken?: (res: AxiosResponse<any>) => void;
}
