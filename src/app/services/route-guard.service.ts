import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }


  checkLogin(url: string): true | UrlTree  {
    console.log("Url: " + url)
    let val: string = sessionStorage.getItem('isUserLoggedIn')!;
    console.log('checkLogin:', val)
    if (val != null && val == "true") {
      if (url == "/login") {
        return this.router.parseUrl('/utenti');
      } else {
        return true;
      }
    }
    else {
      return this.router.parseUrl('/login');
    }

  }
}
