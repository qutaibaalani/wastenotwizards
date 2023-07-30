import { CanActivateFn } from '@angular/router';

export const providerPostGuard: CanActivateFn = (route, state) => {
  return true;
};
