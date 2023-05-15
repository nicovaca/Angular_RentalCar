import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Ruolo} from 'src/app/models/ruolo';
import { Utente } from 'src/app/models/utente';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {UtentiService} from 'src/app/services/utenti.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  username!: string
  password!: string
  utenti:Utente[]=[]
  usernameTest!: string
  passwordTest!: string
  id!: number
  ruolo!: Ruolo

  usernameAdmin!: string
  passwordAdmin!: string

  constructor(
    private utenteService: UtentiService,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.utenteService.getutenti().subscribe(u => this.utenti=u)
    console.log('isUserLoggedIn:',this.authService.isUserLoggedIn)
  }

  onLogin() {
      this.usernameAdmin = this.username
      this.passwordAdmin = this.password


    this.authService.login(this.usernameAdmin, this.passwordAdmin)
        .subscribe(data => {
          console.log("Is Login Success: " + data);
          console.log('isUserLoggedIn:',this.authService.isUserLoggedIn)

          if (data && this.authService.ruolo=='admin') this.router.navigate(['/utenti'])
            .then(() => {
              window.location.reload();
            });
          else if (data && this.authService.ruolo=='customer'){

            let utente = this.utenti.find(u => u.username == this.usernameAdmin && u.password==this.passwordAdmin)
           console.log(utente)
            if (utente)
              this.id=utente.id

            this.router.navigate(['/prenotazioni/prenotazioniCustomer/',this.id])
            .then(() => {
              window.location.reload();
            });
          }
        });
    }

}
