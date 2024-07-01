import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import type {
  User,
  UserLogin,
  UserLoginResponse,
  loggedInUser,
} from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private autoLogoutTimer: any;
  private authToken: string;
  private isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private loggedInUserInfo = new BehaviorSubject<loggedInUser>(
    {} as loggedInUser,
  );

  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<loggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  get token(): string {
    return this.authToken;
  }

  createUser(user: User): Observable<any> {
    const url = 'http://localhost:5001/users/signup';
    return this.httpClient.post(url, user);
  }

  loginUser(user: UserLogin): Observable<any> {
    const url = 'http://localhost:5001/users/login';
    return this.httpClient.post(url, user);
  }

  activateToken(token: UserLoginResponse, email: string): void {
    const user = { ...token.user, email };
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiresIn',
      new Date(Date.now() + token.expiresIn * 1000).toISOString(),
    );
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresIn * 1000);
    this.authToken = token.token;
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next({} as loggedInUser);
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logoutUser();
    }, duration);
  }

  loadToken(): void {
    if (typeof localStorage === 'undefined' || localStorage === null) {
      return;
    }
    const token: string | null = localStorage.getItem('token');
    const expiresIn: string | null = localStorage.getItem('expiresIn');
    const user: string | null = localStorage.getItem('user');
    if (token && expiresIn && user) {
      if (new Date(expiresIn) > new Date()) {
        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(JSON.parse(user));
        this.setAutoLogoutTimer(Number(expiresIn));
        this.authToken = token;
      } else {
        this.logoutUser();
      }
    }
  }
}
