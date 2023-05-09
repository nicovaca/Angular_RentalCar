import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Utenti} from 'src/app/models/utenti';
import {utenti} from '../../environments/utenti';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-form-utente',
  templateUrl: './form-utente.component.html',
  styleUrls: ['./form-utente.component.css']
})
export class FormUtenteComponent implements OnInit {


  utente!: Utenti


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }


  editForm = this.formBuilder.group({
    nome: ['', Validators.required],
    cognome: '',
    email: '',
    eta: 0
  });


  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const utenteIdFromRoute = Number(routeParams.get('id'));
    this.utente = utenti.find(utente => utente.id === utenteIdFromRoute)!;
    if (this.utente) {
      this.editForm.patchValue({
        nome: this.utente.nome,
        cognome: this.utente.cognome,
        email: this.utente.email,
        eta: this.utente.eta
      });
    }
  }


  saveOrUpdateUtente(id: number) {

    if (!id) {
      this.userService.addUser(this.editForm.value.nome!, this.editForm.value.cognome!, this.editForm.value.email!, this.editForm.value.eta!)
      this.router.navigate(['']);
      console.log(this.editForm.value)
    } else {
      this.userService.updateUser(id, this.editForm.value.nome!, this.editForm.value.cognome!, this.editForm.value.email!, this.editForm.value.eta!)
      this.router.navigate(['']);
      console.log(this.editForm.value)
    }
  }

}
