import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedin(state.url);
  }

  checkLoggedin(url: string): boolean {
    if (this.service.isLoggedIn()) {
      return true;
    }
    // this.service.redirectUrl = url;
    this.router.navigate(['/login'], {queryParams: {continue: url}});
    return false;
  }
}
