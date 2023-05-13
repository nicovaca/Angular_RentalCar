import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Ruolo } from 'src/app/models/ruolo';
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
  id!:number
  ruolo!:Ruolo

  usernameAdmin!:string
  passwordAdmin!:string

  constructor(
    private utenteService: UtentiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.utenteService.getUtenteById(3).subscribe((u) => {
      this.usernameTest = u.username
      this.passwordTest = u.password
      this.id=u.id
      this.ruolo=u.ruolo

    })
    this.utenteService.getAdmin().subscribe((u)=>{
      this.usernameAdmin = u.username
      this.passwordAdmin = u.password
    })

  }

  onLogin() {
    if (this.username === this.usernameTest && this.password === this.passwordTest) {
      this.router.navigate(['prenotazioni/prenotazioniCustomer/', this.id])
    }else if(this.username === this.usernameAdmin && this.password === this.passwordAdmin){
      this.router.navigate(['prenotazioni'])
    }
  }
}
