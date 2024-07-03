import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../../services/users/user.service';
import { UserServiceMock } from '../../../../shared/mocks/user.service.mock';
import { of, throwError } from 'rxjs';
import { AlertType } from '../../../types/alert.type';
import { UserLoginResponse } from '../../../types/user.type';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserLoginComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FontAwesomeModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useClass: UserServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require value in the email field', () => {
    component.email?.patchValue('');
    fixture.detectChanges();
    expect(component.email?.valid).toBeFalse();
    expect(component.email?.errors?.['required']).toBeTrue();

    component.email?.patchValue('john@gmail.com');
    fixture.detectChanges();
    expect(component.email?.valid).toBeTrue();
  });

  it('should require value in the password field', () => {
    component.password?.patchValue('');
    fixture.detectChanges();
    expect(component.password?.valid).toBeFalse();
    expect(component.password?.errors?.['required']).toBeTrue();

    component.password?.patchValue('password');
    fixture.detectChanges();
    expect(component.password?.valid).toBeTrue();
  });

  it('should require at least 6 characters in the password field', () => {
    component.password?.patchValue('pas');
    fixture.detectChanges();
    expect(component.password?.valid).toBeFalse();
    expect(component.password?.errors?.['minlength']).toBeTruthy();

    component.password?.patchValue('password');
    fixture.detectChanges();
    expect(component.password?.valid).toBeTrue();
  });

  it('should set success message on successful login', fakeAsync(() => {
    const mockResponse: UserLoginResponse = {
      user: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@gmail.com',
        address: '1234 Elm St',
        city: 'Springfield',
        state: 'IL',
        pin: '62701',
      },
      token: 'token123',
      expiresIn: 3600,
    };
    spyOn(userService, 'loginUser').and.returnValue(of(mockResponse));
    spyOn(userService, 'activateToken').and.callThrough();

    component.onSubmit();

    jasmine.clock().tick(1000);

    expect(userService.activateToken).toHaveBeenCalledWith(mockResponse);
    expect(component.alert?.type).toBe(AlertType.Success);
    expect(component.alert?.message).toBe('Success');
  }));

  it('should set error message on unsuccessful login', fakeAsync(() => {
    spyOn(userService, 'loginUser').and.returnValue(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    component.email?.patchValue('test@test.com');
    component.password?.patchValue('password');
    component.onSubmit();
    tick();
    expect(component.alert?.type).toBe(AlertType.Error);
    expect(component.alert?.message).toBe('Invalid credentials');
  }));
});
