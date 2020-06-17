export interface NotificationPayload {
  color: string;
  title: string;
  description: string;
}

export interface NotificationState {
  isShowing: boolean;
  color: string | null;
  title: string | null;
  description: string | null;
  onClick?: Function | null;
  clearNotification?: () => void;
  displayNotification?: (payload: NotificationPayload) => void;
}
