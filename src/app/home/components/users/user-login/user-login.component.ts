import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/users/user.service';
import type { UserLoginResponse } from '../../../types/user.type';
import { Alert, AlertType } from '../../../types/alert.type';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup;
  alert: Alert;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    this.userService.loginUser({email: this.email?.value, password: this.password?.value}).subscribe({
      next: (response: UserLoginResponse) => {
        this.userService.activateToken(response);
        this.alert = {message: 'Success', type: AlertType.Success};
      },
      error: (error: any) => {
        this.alert = {message: error.error.message, type: AlertType.Error};
      }
    });
  }
}
