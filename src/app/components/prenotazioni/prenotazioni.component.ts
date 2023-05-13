import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MyAction} from 'src/app/configs/configClass/my-action';
import {MyTableActionEnum} from 'src/app/configs/configClass/my-table-action-enum';
import {MyTableConfig} from 'src/app/configs/my-table-config/my-table-config';
import {PeriodoPrenotazione} from 'src/app/models/periodo-prenotazione';
import {Prenotazione} from 'src/app/models/prenotazione';
import {PrenotazioniService} from 'src/app/services/prenotazioni.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  prenotazioni: Prenotazione[] = []
  periodoPrenotazione: PeriodoPrenotazione[] = []
  prenotazione!: Prenotazione


  constructor(
    private prenotazioneService: PrenotazioniService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getPrenotazioni();
    this.getPeriodoPrenotazioni()


  }


  getPrenotazioni() {
    this.prenotazioneService.getPrenotazioni()
      .subscribe(prenotazioni => (this.prenotazioni = prenotazioni));
  }

  getPeriodoPrenotazioni() {
    this.prenotazioneService.getPeriodoPrenotazione()
      .subscribe((periodoPrenotazioni) => (this.periodoPrenotazione = periodoPrenotazioni))
  }


  headersTable: MyTableConfig = {
    headers: [
      {key: "id", label: "Id Prenotazione"},
      {key: "dataInizio", label: "Data Inizio Prenotazione"},
      {key: "dataFine", label: "Data Inizio Prenotazione"},
      {key: "approvazione", label: "Approvazione"},
      {key: "utenteId", label: "Id Utente"},
      {key: "veicolo", label: "Id Veicolo"}

    ],
    order: {defaultColumn: "id", orderType: "desc"},
    search: {columns: ["utente", "veicolo"]},
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
    ]
  }

  eliminaPrenotazione(dataInizio: Date) {
    if (new Date(dataInizio).getTime() - new Date().getTime() <= 2) {
      return false
    } else
      return true
  }

  getAction(action: MyAction, object: any) {

    let id: number = object ? object.id : 0

    console.log(id)
    switch (action.type) {
      case MyTableActionEnum.DELETE:
        if (this.eliminaPrenotazione(object.dataInizio)) {

          this.prenotazioni = this.prenotazioni.filter(p => p.id !== id);
          this.prenotazioneService.deletePrenotazione(id).subscribe();
        } else {
          window.alert('La prenotazione non può essere cancellata.')
        }
        break;

      case MyTableActionEnum.EDIT:
        let prenotazione = this.prenotazioni.filter(p => p.id === id).shift()
        let idUtente = prenotazione ? prenotazione.utenteId : 0
        this.router.navigate(['prenotazioni/prenotazioniCustomer/', id, idUtente])
        break;

      case MyTableActionEnum.NEW_ROW:
        let idNew = 0
        this.router.navigate(['prenotazioni/', idNew])
        break;
    }

  }

}
