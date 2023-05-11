import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Utenti} from 'src/app/models/utenti';

import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Veicolo} from 'src/app/models/veicolo';
import {VeicoliService} from 'src/app/services/veicoli.service';
import { TipoVeicolo } from 'src/app/models/tipo-veicolo';


@Component({
  selector: 'app-form-veicolo',
  templateUrl: './form-veicolo.component.html',
  styleUrls: ['./form-veicolo.component.css']
})
export class FormVeicoloComponent {

  veicolo!: Veicolo;
  veicoli: Veicolo[] = [];
  veicoloIdFromRoute: any
  id!: number
  stateTypes = Object.values(TipoVeicolo);


  constructor(private route: ActivatedRoute,
              private veicoloService: VeicoliService,
              private router: Router) {
  }




  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.veicoloIdFromRoute = Number(routeParams.get('id'));

    if (this.veicoloIdFromRoute !== 0) {
      this.veicoloService.getVeicoloById(this.veicoloIdFromRoute).subscribe((veicolo) => {
        this.veicolo = veicolo
        console.log(this.veicolo)
      })

    } else {
      this.veicoloService.getVeicoli().subscribe((r) => {
        this.id = r.length + 1
        console.log(this.id)
        this.veicolo = {
          id: this.id,
          casaCostruttrice: '',
          modello: '',
          targa: '',
          annoImmatricolazione: 0,
          tipoVeicolo: this.TipoVeicolo.AUTO,
          prenotazioni: []
        }
      })


    }

  }


  saveOrUpdateUtente() {

    if (this.veicoloIdFromRoute != 0) {
      this.veicoloService.addVeicolo(this.veicolo).subscribe(hero => this.veicoli.push(hero))
      this.router.navigate(['veicoli']);
      console.log(this.veicolo)

    } else {
      //this.veicoloService.updateVeicolo(id, this.editForm.value.nome!, this.editForm.value.cognome!, this.editForm.value.email!, this.editForm.value.eta!)
      this.veicoloService.updateVeicolo(this.veicolo).subscribe()
      this.router.navigate(['veicoli']);

    }
  }


  protected readonly Object = Object;
  protected readonly TipoVeicolo = TipoVeicolo;
}
