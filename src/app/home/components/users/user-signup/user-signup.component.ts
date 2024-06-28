import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserService } from '../services/user.service';
import type { User } from '../../../types/user.type';
import type { Alert } from '../../../types/alert.type';
import { AlertType } from '../../../types/alert.type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss',
  providers: [UserService],
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup;
  alert: Alert;
  faCheckCircle = faCheckCircle;
  faInfoCircle = faInfoCircle;
  faExclamationCircle = faExclamationCircle;
  faTimesCircle = faTimesCircle;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('first_name');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirm_password');
  }

  ngOnInit(): void {
    this.userSignupForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', []],
      address: ['', []],
      city: ['', []],
      state: ['', []],
      pin: ['', []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    },{
      validator: matchPasswords,
    });
  }

  onSubmit(): void {
    console.log(this.userSignupForm.value);
    const user: User = {
      first_name: this.firstName?.value,
      last_name: this.userSignupForm.get('last_name')?.value,
      address: this.userSignupForm.get('address')?.value,
      city: this.userSignupForm.get('city')?.value,
      state: this.userSignupForm.get('state')?.value,
      pin: this.userSignupForm.get('pin')?.value,
      email: this.email?.value,
      password: this.password?.value,
    };
    this.userService.createUser(user).subscribe({
      next: (response) => {
        console.log(response);
        this.alert = {
          type: AlertType.Success,
          message: 'User created successfully',
        };
      },
      error: (error) => {
        console.error(error);
        if (error.status === 409) {
          this.alert = {
            type: AlertType.Warning,
            message: error.error.message,
          };
        } else {
          this.alert = {
            type: AlertType.Error,
            message: error.error.message,
          };
        }
        console.log(this.alert);
      }
    });
  }

}
