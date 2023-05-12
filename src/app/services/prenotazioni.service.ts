import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError } from 'rxjs';
import { Prenotazione } from '../models/prenotazione';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  prenotazioniUrl = 'api/prenotazioni';  // URL to web api
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


  /** GET prenotazioni from the server */
  getPrenotazioni(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(this.prenotazioniUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPeriodoPrenotazione(): Observable<[]> {
    return this.http.get<[]>('api/periodoPrenotazione')
      .pipe(
        catchError(this.handleError)
      );
  }

  getPrenotazioneById(id:number){
    const url = `${this.prenotazioniUrl}/${id}`;
    return this.http.get<Prenotazione>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  /** POST: add to the database */
  addPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
    return this.http.post<Prenotazione>(this.prenotazioniUrl, prenotazione, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** DELETE: delete from the server */
  deletePrenotazione(id: number): Observable<unknown> {
    const url = `${this.prenotazioniUrl}/${id}`; // DELETE api/prenotazioni
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** PUT: update on the server. Returns the updated upon success. */
  updatePrenotazione(prenotazione: Prenotazione): Observable<any> {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put(this.prenotazioniUrl , prenotazione, this.httpOptions)
      .pipe(
        catchError(this.handleError)

      );
  }
}
