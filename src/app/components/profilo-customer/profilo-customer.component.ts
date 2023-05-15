import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MyAction} from 'src/app/configs/configClass/my-action';
import {MyTableActionEnum} from 'src/app/configs/configClass/my-table-action-enum';
import {MyTableConfig} from 'src/app/configs/my-table-config/my-table-config';
import {Prenotazione} from 'src/app/models/prenotazione';
import { Utente } from 'src/app/models/utente';
import {PrenotazioniService} from 'src/app/services/prenotazioni.service';
import {UtentiService} from 'src/app/services/utenti.service';

@Component({
  selector: 'app-profilo-customer',
  templateUrl: './profilo-customer.component.html',
  styleUrls: ['./profilo-customer.component.css']
})
export class ProfiloCustomerComponent implements OnInit {

  prenotazioniUtente: Prenotazione[] = []
  prenotazioni: Prenotazione[] = []
  prenotazione!: Prenotazione
  utente: any
  customer!:Utente

  constructor(
    private utenteService: UtentiService,
    private prenotazioneService: PrenotazioniService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.utente = Number(routeParams.get('id'));
    console.log(this.utente)
    this.getPrenotazioneCustomer(this.utente);
    this.getCustomer(this.utente)
  }


  getPrenotazioneCustomer(utente: any) {
    console.log(utente)
    if(utente){
      this.getPrenotazioniUtente(utente)
    }else
      this.getPrenotazioni()
  }

  getCustomer(id:number){
    this.utenteService.getUtenteById(this.utente).subscribe((u)=>{
      this.customer=u
    })
  }

  getPrenotazioniUtente(utente:any) {
    this.prenotazioneService.getPrenotazioni()
      .subscribe(prenotazioni => (this.prenotazioniUtente = prenotazioni.filter(p => p.utente === utente)));
  }
  getPrenotazioni(){
    this.prenotazioneService.getPrenotazioni()
      .subscribe(prenotazioni => this.prenotazioniUtente=prenotazioni)
  }
  headersTable: MyTableConfig = {
    headers: [
      {key: "id", label: "Id Prenotazione"},
      {key: "dataInizio", label: "Data Inizio Prenotazione"},
      {key: "dataFine", label: "Data Inizio Prenotazione"},
      {key: "approvazione", label: "Approvazione"},
      {key: "veicolo", label: "Id Veicolo"}

    ],
    order: {defaultColumn: "id", orderType: "desc"},
    search: {columns: ["veicolo"]},
    pagination: {itemPerPage: 5, itemPerPageOptions: [5, 10, 15]},
    actions: [
      {
        type: MyTableActionEnum.EDIT, buttonConfig: {
          customCssClass: 'btn btn-info',
          icon: 'fas fa-plus',
          text: 'Modifica'
        }, newRowButton: false
      },
      {
        type: MyTableActionEnum.DELETE, buttonConfig: {
          customCssClass: 'btn btn-danger',
          icon: 'fa fa-trash',
          text: 'Elimina'
        }, newRowButton: false
      },
      {
        type: MyTableActionEnum.NEW_ROW, buttonConfig: {
          customCssClass: 'btn btn-success',
          icon: 'fa fa-plus',
          text: 'Nuova Prenotazione'
        }, newRowButton: true
      },
    ]
  }


  getAction(action: MyAction, object: any) {

    let id: number = object ? object.id : 0

    console.log(id)
    switch (action.type) {
      case MyTableActionEnum.DELETE:

        this.prenotazioniUtente = this.prenotazioniUtente.filter(p => p.id !== id);
        this.prenotazioneService.deletePrenotazione(id).subscribe();
        break;

      case MyTableActionEnum.EDIT:
        this.router.navigate(['prenotazioni/prenotazioniCustomer/', id,this.utente])
        break;

      case MyTableActionEnum.NEW_ROW:
        let idNew = 0
        this.router.navigate(['prenotazioni/prenotazioniCustomer/', idNew,this.utente])
        break;
    }

  }
}
