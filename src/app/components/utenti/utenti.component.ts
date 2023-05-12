import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyAction } from 'src/app/configs/configClass/my-action';
import { MyTableActionEnum } from 'src/app/configs/configClass/my-table-action-enum';
import { MyTableConfig } from 'src/app/configs/my-table-config/my-table-config';
import { Utente } from 'src/app/models/utente';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent {

  utenti: Utente[] = [];



  constructor(
    private utenteService:UtentiService,
    private router: Router,

  ) {
  }



  ngOnInit(): void {
    this.getutenti();
  }


  getutenti() {
    this.utenteService.getutenti()
      .subscribe(utenti => (this.utenti=utenti));
  }


  headersTable: MyTableConfig = {
    headers: [
      {key: "nome", label: "Nome"},
      {key: "cognome", label: "Cognome"},
      {key: "email", label: "email"},
      {key: "username", label: "Username"},
      {key: "dataNascita", label: "Data di Nascita"},
      {key: "prenotazioni", label: "Id Prenotazione"}

    ],
    order: {defaultColumn: "id", orderType: "desc"},
    search: {columns: ["nome", "cognome","email","username"]},
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
          text: 'Aggiungi Utente'
        }, newRowButton: true
      }

    ]
  }


  getAction(action: MyAction, object:any) {

    let id:number = object? object.id : 0


    console.log(id)
    switch (action.type) {
      case MyTableActionEnum.DELETE:

        this.utenti = this.utenti.filter(u => u.id !== id);
        this.utenteService.deleteUtente(id).subscribe();
        break;

      case MyTableActionEnum.EDIT:
        this.router.navigate(['utenti/', id])
        break;

      case MyTableActionEnum.NEW_ROW:
        let idNew=0
        this.router.navigate(['utenti/', idNew])
        break;
    }

  }
}
