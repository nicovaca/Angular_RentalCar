import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {utenti} from '../../../environments/utenti';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { Utente } from 'src/app/models/utente';
import { UtentiService } from 'src/app/services/utenti.service';
import { Ruolo } from 'src/app/models/ruolo';

@Component({
  selector: 'app-form-utente',
  templateUrl: './form-utente.component.html',
  styleUrls: ['./form-utente.component.css']
})
export class FormUtenteComponent implements OnInit {

  utente!:Utente
  utenti:Utente[] = []
  utenteIdFromRoute: any
  id!: number

  constructor(private route: ActivatedRoute,
              private utenteService: UtentiService,
              private router: Router) {
  }
    ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      this.utenteIdFromRoute = Number(routeParams.get('id'));

      if (this.utenteIdFromRoute !== 0) {
        this.utenteService.getUtenteById(this.utenteIdFromRoute).subscribe((utente) => {
          this.utente = utente
          console.log(this.utente)
        })

      } else {
        this.utenteService.getutenti().subscribe((r) => {
          this.id = r.length + 1
          console.log(this.id)
          this.utente = {
            id: this.id,
            nome: '',
            cognome: '',
            dataNascita: new Date(),
            email: '',
            username:'',
            password:'',
            ruolo: Ruolo.CUSTOMER,
            prenotazioni: []
          }
        })


      }
    }

  saveOrUpdateUtente(){
  if (this.utenteIdFromRoute === 0) {
  this.utenteService.addUtente(this.utente).subscribe(utente => this.utenti.push(utente))
  this.router.navigate(['utenti']);
  console.log(this.utente)

} else {
  this.utenteService.updateUtente(this.utente).subscribe()
  this.router.navigate(['utenti']);

}
  }

}
