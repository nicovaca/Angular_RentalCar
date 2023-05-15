import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError } from 'rxjs';
import { Utente } from '../models/utente';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  utentiUrl = 'api/utenti';  // URL to web api
  adminUrl='api/admin'
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  constructor(
    private http: HttpClient,
  ) {}


  /** GET utenti from the server */
  getutenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.utentiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAdmin(){
    return this.http.get<Utente>(this.adminUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUtenteById(id:number){
    const url = `${this.utentiUrl}/${id}`;
    return this.http.get<Utente>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  /** POST: add to the database */
  addUtente(utente: Utente): Observable<Utente> {
    return this.http.post<Utente>(this.utentiUrl, utente, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** DELETE: delete from the server */
  deleteUtente(id: number): Observable<unknown> {
    const url = `${this.utentiUrl}/${id}`; // DELETE api/utenti
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** PUT: update on the server. Returns the updated upon success. */
  updateUtente(utente: Utente): Observable<any> {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put(this.utentiUrl , utente, this.httpOptions)
      .pipe(
        catchError(this.handleError)

      );
  }
}
