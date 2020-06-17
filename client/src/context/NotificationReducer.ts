import { NotificationState } from "../utils/notificationTypes";

export const NotificationReducer = (
  state: any,
  action: any
): NotificationState => {
  switch (action.type) {
    case "DISPLAY_NOTIFICATION":
      return {
        ...state,
        isShowing: true,
        color: action.payload.color,
        title: action.payload.title,
        description: action.payload.description,
        onClick: action.payload.onClick || null,
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        isShowing: false,
        color: null,
        title: null,
        description: null,
        onClick: null,
      };
    default:
      return state;
  }
};
