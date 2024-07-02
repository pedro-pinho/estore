/* eslint-disable @typescript-eslint/no-empty-function */
import { Observable, of, BehaviorSubject } from 'rxjs';
import { loggedInUser } from '../../home/types/user.type';

export class UserServiceMock {
  isUserAuthenticated: any;
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
  token: any;

  createUser(): any { };
  loginUser(): any { };
  activateToken(): any { };
  logoutUser(): any { };
  loadToken(): any { };
}
