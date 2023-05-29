import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../Service/user-service.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const guardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(UserServiceService).validateToken().pipe(tap((isTokenOk: any) => !isTokenOk && router.navigate(['login'])));
};
