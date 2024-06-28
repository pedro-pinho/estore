export interface Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
}
