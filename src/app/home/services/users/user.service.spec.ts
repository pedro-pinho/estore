import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, TestRequest, provideHttpClientTesting } from '@angular/common/http/testing';
import { loggedInUser } from '../../types/user.type';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(),provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post query on createUser', () => {
    const user = {
      first_name: 'Jill',
      last_name: 'Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      pin: '12345',
      email: 'jill.doe@gmail.com',
      password: 'password',
    };
    service.createUser(user).subscribe();

    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/users/signup');

    expect(request.request.method).toBe('POST');
  });

  it('should call post query on loginUser', () => {
    const user = {
      email: 'jill.doe@gmail.com',
      password: 'password',
    };
    service.loginUser(user).subscribe();

    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/users/login');

    expect(request.request.method).toBe('POST');
  });

  it('should activate token and set localStorage items', () => {
    const token = {
      token: 'token123',
      expiresIn: 3600,
      user: {
        first_name: 'Jill',
        last_name: 'Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        pin: '12345',
        email: 'jill.doe@gmail.com',
      }
    }
    service.activateToken(token);

    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('expiresIn')).toBeTruthy();
    expect(localStorage.getItem('user')).toBe(JSON.stringify(token.user));
    expect(service.loggedInUser).toEqual(token.user);
    expect(service.token).toBe('token123');
    expect(service.isUserAuthenticated).toBeTrue();
  });

  it('should logout user and clear localStorage items', () => {
    spyOn(service, 'logoutUser').and.callThrough();
    service.activateToken({
      token: 'token123',
      expiresIn: 3600,
      user: {
        first_name: 'Jill',
        last_name: 'Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        pin: '12345',
        email: 'jill.doe@gmail.com',
      },
    });

    service.logoutUser();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('expiresIn')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.isUserAuthenticated).toBe(false);
    expect(service.loggedInUser).toEqual({} as loggedInUser);
  });

  it('should set auto logout timer', fakeAsync(() => {
    spyOn(service, 'logoutUser').and.callThrough();
    const duration = 1000;
    service.activateToken({
      token: 'testToken',
      expiresIn: duration / 1000,
      user: {
        first_name: 'Jill',
        last_name: 'Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        pin: '12345',
        email: 'jill.doe@gmail.com',
      },
    });

    tick(duration);
    expect(service.logoutUser).toHaveBeenCalled();
  }));

  it('should logout user if token is expired', () => {
    const token = 'testToken';
    const expiresIn = new Date(Date.now() - 3600 * 1000).toISOString();
    const user = {
      first_name: 'Jill',
      last_name: 'Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      pin: '12345',
      email: 'jill.doe@gmail.com',
    };

    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('user', JSON.stringify(user));

    spyOn(service, 'logoutUser').and.callThrough();
    service.loadToken();

    expect(service.isUserAuthenticated).toBe(false);
    expect(service.loggedInUser).toEqual({} as loggedInUser);
    expect(service.logoutUser).toHaveBeenCalled();
  });

  it('should load token from localStorage and set authenticated state', () => {
    const token = 'token123';
    const expiresIn = new Date(Date.now() + 3600 * 1000).toISOString();
    const user = {
      first_name: 'Jill',
      last_name: 'Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      pin: '12345',
      email: 'jill.doe@gmail.com',
    };
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('user', JSON.stringify(user));

    service.loadToken();

    expect(service.isUserAuthenticated).toBe(true);
    expect(service.loggedInUser).toEqual(user);
    expect(service.token).toBe(token);
  });
});
