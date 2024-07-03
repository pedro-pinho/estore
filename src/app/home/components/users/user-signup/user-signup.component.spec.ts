import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { UserSignupComponent } from './user-signup.component';
import { UserService } from '../../../services/users/user.service';
import { UserServiceMock } from '../../../../shared/mocks/user.service.mock';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AlertType } from '../../../types/alert.type';

describe('UserSignupComponent', () => {
  let component: UserSignupComponent;
  let fixture: ComponentFixture<UserSignupComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSignupComponent, ReactiveFormsModule],
      providers: [{ provide: UserService, useClass: UserServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require value in firstName field', () => {
    component.firstName?.patchValue('');
    fixture.detectChanges();
    expect(component.firstName?.valid).toBeFalse();
    expect(component.firstName?.errors?.['required']).toBeTrue();

    component.firstName?.patchValue('John');
    fixture.detectChanges();
    expect(component.firstName?.valid).toBeTrue();
  });

  it('should require valid value in Email field', () => {
    component.email?.patchValue('john');
    fixture.detectChanges();
    expect(component.email?.valid).toBeFalse();
    expect(component.email?.errors?.['email']).toBeTrue();

    component.email?.patchValue('john@gmail.com');
    fixture.detectChanges();
    expect(component.email?.valid).toBeTrue();
  });

  it('should match password and confirm password fields', () => {
    component.password?.patchValue('password');
    component.confirmPassword?.patchValue('password2');
    fixture.detectChanges();

    expect(component.userSignupForm.valid).toBeFalse();
    expect(component.userSignupForm?.errors?.['matchPasswords']).toBeTrue();

    component.confirmPassword?.patchValue('password');
    fixture.detectChanges();
    expect(
      component.userSignupForm?.errors?.['matchPasswords']
    ).toBeUndefined();
  });

  it('should set success message for creating user successfully', fakeAsync(() => {
    spyOn(userService, 'createUser').and.returnValue(
      of({ message: 'User created successfully' })
    );
    component.onSubmit();
    tick();
    expect(component.alert?.type).toBe(AlertType.Success);
    expect(component.alert?.message).toBe('User created successfully');
  }));

  it('should set error message for creating user unsuccessfully', fakeAsync(() => {
    spyOn(userService, 'createUser').and.returnValue(
      throwError(() => ({ error: { message: 'User creation failed' } }))
    );
    component.onSubmit();
    tick();
    expect(component.alert?.type).toBe(AlertType.Error);
    expect(component.alert?.message).toBe('User creation failed');
  }));


  it('should set warning message for creating user unsuccessfully', fakeAsync(() => {
    spyOn(userService, 'createUser').and.returnValue(
      throwError(() => ({ status: 409, error: { message: 'User already exists' } }))
    );
    component.onSubmit();
    tick();
    expect(component.alert?.type).toBe(AlertType.Warning);
    expect(component.alert?.message).toBe('User already exists');
  }));
});
