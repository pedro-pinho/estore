/* eslint-disable @typescript-eslint/no-empty-function */
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserLoginResponse, loggedInUser } from '../../home/types/user.type';

export class UserServiceMock {
  private _isUserAuthenticated = false;
  private _token = 'token123';
  get isUserAuthenticated() {
    return this._isUserAuthenticated;
  }
  set isUserAuthenticated(value: boolean) {
    this._isUserAuthenticated = value;
  }
  get token() {
    return this._token;
  }
  set token(value: string) {
    this._token = value;
  }
  autoLogoutTimer: any;
  authToken: string;
  isAuthenticated: Observable<boolean> = of(true);
  isUserAuthenticated$: Observable<boolean> = of(true);
  loggedInUser: Observable<loggedInUser> = of(({
    first_name: "John",
  } as loggedInUser));
  loggedInUser$: BehaviorSubject<loggedInUser> = new BehaviorSubject<loggedInUser>({
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    address: "1234 Elm St",
    city: "Springfield",
    state: "IL",
    pin: "62701",
  });

  createUser(): any { };
  loginUser(): Observable<UserLoginResponse> {
    return of({
      user: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@gmail.com",
        address: "1234 Elm St",
        city: "Springfield",
        state: "IL",
        pin: "62701",
      },
      token: 'token123',
      expiresIn: 3600,
    });
  };
  activateToken(): any { };
  logoutUser(): any { };
  loadToken(): any { };
}
