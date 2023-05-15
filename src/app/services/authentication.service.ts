import { Injectable } from '@angular/core';
import {delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserLoggedIn: boolean = false;

  constructor() { }

  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);
    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('isUserLoggedIn');
  }

  getToken = (): string => {
    var tokenAuth = sessionStorage.getItem("token")
    return (tokenAuth) ? tokenAuth : "";
  }


}
