import { Injectable } from '@angular/core';
import {delay, Observable, of, tap } from 'rxjs';
import { Utente } from '../models/utente';
import { UtentiService } from './utenti.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserLoggedIn: boolean = false;
  ruolo:string=''
  utenti:Utente[]=[]
  constructor(private utenteService : UtentiService) { }

  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);

    this.utenteService.getutenti().subscribe(utenti => (this.utenti = utenti));

    if (userName == 'admin' && password == 'admin'){
    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    this.ruolo='admin'
      sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
      sessionStorage.setItem('ruolo', this.ruolo='admin');

    }
    else if (this.utenti.find(u => u.username == userName) && this.utenti.find(u => u.password == password) ){
      console.log(this.utenti.filter(u => u.username == userName))
      this.isUserLoggedIn = userName == userName && password == password;
      this.ruolo='customer'
      sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
      sessionStorage.setItem('ruolo', this.ruolo='customer');
    }
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
    sessionStorage.removeItem('ruolo');
  }

  getToken = (): string => {
    var tokenAuth = sessionStorage.getItem("token")
    return (tokenAuth) ? tokenAuth : "";
  }


}
