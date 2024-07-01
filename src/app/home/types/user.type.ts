export interface User {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
  expiresIn: number;
  user: loggedInUser;
}

export interface loggedInUser {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  pin: string;
}
