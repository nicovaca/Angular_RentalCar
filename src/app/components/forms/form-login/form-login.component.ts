import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Ruolo} from 'src/app/models/ruolo';
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
    this.utenteService.getUtenteById(3).subscribe((u) => {
      this.usernameTest = u.username
      this.passwordTest = u.password
      this.id = u.id
      this.ruolo = u.ruolo

    })
    console.log('isUserLoggedIn:',this.authService.isUserLoggedIn)
  }

  onLogin() {
    if (this.username === this.usernameTest && this.password === this.passwordTest) {
      this.router.navigate(['prenotazioni/prenotazioniCustomer/', this.id])
    } else {
      this.usernameAdmin = this.username
      this.passwordAdmin = this.password
      this.authService.login(this.usernameAdmin, this.passwordAdmin)
        .subscribe(data => {
          console.log("Is Login Success: " + data);
          console.log('isUserLoggedIn:',this.authService.isUserLoggedIn)

          if (data) this.router.navigate(['/utenti'])
            .then(() => {
              window.location.reload();
            });
        });
    }
  }
}
