import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './services/users/user.service';

export const AuthGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isUserAuthenticated) {
    return true;
  } else {
    router.navigate(['/home/login']);
    return false;
  }
};
