import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Prenotazione} from 'src/app/models/prenotazione';
import {Utente} from 'src/app/models/utente';
import {Veicolo} from 'src/app/models/veicolo';
import {PrenotazioniService} from 'src/app/services/prenotazioni.service';
import { UtentiService } from 'src/app/services/utenti.service';
import {VeicoliService} from 'src/app/services/veicoli.service';

@Component({
  selector: 'app-form-prenotazione',
  templateUrl: './form-prenotazione.component.html',
  styleUrls: ['./form-prenotazione.component.css']
})
export class FormPrenotazioneComponent implements OnInit {
  prenotazione!: Prenotazione
  prenotazioni: Prenotazione[] = []
  prenotazioneIdFromRoute: any
  id!: number
  utenteId!:number
  utente!: Utente
  veicolo!: Veicolo
  veicoli: Veicolo[] = []

  isUserLoggedIn = false;
  ruolo: string = ''


  constructor(private route: ActivatedRoute,
              private prenotazioneService: PrenotazioniService,
              private veicoloService: VeicoliService,
              private utenteService: UtentiService,
              private router: Router) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.prenotazioneIdFromRoute = Number(routeParams.get('id'));
    this.utenteId = Number(routeParams.get('idUtente'));

    let storeData = sessionStorage.getItem("isUserLoggedIn");
    let ruolo = sessionStorage.getItem("ruolo");
    console.log("StoreData: " + storeData);

    if (storeData != null && storeData == "true")
      this.isUserLoggedIn = true;
    if (ruolo=='admin'){
      this.ruolo=ruolo
    }else if (ruolo=='customer')
      this.ruolo=ruolo
    else
      this.isUserLoggedIn = false;


    if (this.prenotazioneIdFromRoute !== 0) {
      this.prenotazioneService.getPrenotazioneById(this.prenotazioneIdFromRoute).subscribe((prenotazione) => {
        this.prenotazione = prenotazione
        console.log(this.prenotazione)
      })

    } else {
      this.utenteService.getUtenteById(this.utenteId).subscribe((utente) => {
        this.utente = utente
      })
      console.log(this.utente)
      this.prenotazioneService.getPrenotazioni().subscribe((r) => {
        this.id = r.length + 1
        console.log(this.id)
        this.prenotazione = {
          id: this.id,
          dataInizio: new Date(),
          dataFine: new Date(),
          approvazione: false,
          utente: this.utente,
          veicolo: this.veicolo,
          utenteId:this.utente.id
        }

      })



    }

    this.getVeicoli()
    console.log(this.veicoli)
  }

  getVeicoli() {
    this.veicoloService.getVeicoli()
      .subscribe(veicoli => (this.veicoli = veicoli));
  }


  saveOrUpdatePrenotazione() {
    if (this.prenotazioneIdFromRoute === 0) {
      this.prenotazioneService.addPrenotazione(this.prenotazione).subscribe(prenotazione => this.prenotazioni.push(prenotazione))
      this.router.navigate(['prenotazioni']);
      console.log(this.prenotazione)

    } else {
      this.prenotazioneService.updatePrenotazione(this.prenotazione).subscribe()
      this.router.navigate(['prenotazioni']);

    }
  }
}
