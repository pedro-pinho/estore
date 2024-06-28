import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');

  return password && confirmPassword && password.value !== confirmPassword.value ? { matchPasswords: true } : null;
}
