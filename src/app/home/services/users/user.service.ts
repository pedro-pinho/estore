import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { User, UserLogin, UserLoginResponse } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.httpClient.post(url, user);
  }

  loginUser(user: UserLogin): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.httpClient.post(url, user);
  }

  activateToken(token: UserLoginResponse): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiresIn', new Date(Date.now() + token.expiresIn * 1000).toISOString());
  }
}
