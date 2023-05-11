import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyAction } from 'src/app/configs/configClass/my-action';
import { MyTableActionEnum } from 'src/app/configs/configClass/my-table-action-enum';
import { MyButtonConfig } from 'src/app/configs/my-button-config/my-button-config';
import { MyTableConfig } from 'src/app/configs/my-table-config/my-table-config';
import { utenti } from 'src/app/environments/utenti';
import { Utenti } from 'src/app/models/utenti';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-veicoli',
  templateUrl: './veicoli.component.html',
  styleUrls: ['./veicoli.component.css']
})
export class VeicoliComponent {

  data: Utenti[] = utenti;


  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }



  bottoneHome: MyButtonConfig = {
    customCssClass: 'btn btn-primary',
    icon: 'fa fa-home',
    text: 'Home'
  }

  bottoneElimina: MyButtonConfig = {
    customCssClass: 'btn btn-danger',
    icon: 'fa fa-trash',
    text: 'Elimina'
  }

  headersTable: MyTableConfig = {
    headers: [
      {key: "nome", label: "Nome"},
      {key: "cognome", label: "Cognome"},
      {key: "email", label: "Email"},
      {key: "eta", label: "Età"}
    ],
    order: {defaultColumn: "nome", orderType: "desc"},
    search: {columns: ["nome", "cognome", "email"]},
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

        this.data = this.data.filter(utente => utente.id !== id);
        this.userService.deleteUser(id)
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
