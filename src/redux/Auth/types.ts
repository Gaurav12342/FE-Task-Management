/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IData {
  message?: string;
  status?: string;
  statusCode?: any;
  token?: string;
}

export interface ISignInInitialState {
  loading: boolean;
  data: IData;
  error: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface ISignUpInitialState {
  loading: boolean;
  data: any;
  error: string;
}
