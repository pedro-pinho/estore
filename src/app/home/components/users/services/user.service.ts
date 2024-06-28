import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { User } from '../../../types/user.type';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<any> {
    const url = 'http://localhost:5001/users/signup';
    return this.httpClient.post(url, user);
  }
}
