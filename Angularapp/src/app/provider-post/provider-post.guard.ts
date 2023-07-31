import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderPostGuard implements CanActivate {
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Get the user's role from local storage
    const userRole = localStorage.getItem('role');

    // Only allow nav if useris provider
    if (userRole === 'provider') {
      return true;
    } else {
      alert('Access Denied. You are not allowed to access this page.');
      return false;
    }
  }
  
}
