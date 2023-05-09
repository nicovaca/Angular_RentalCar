import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {MyAction} from './configs/configClass/my-action';
import {MyTableActionEnum} from './configs/configClass/my-table-action-enum';
import {MyButtonConfig} from './configs/my-button-config/my-button-config';
import {MyTableConfig} from './configs/my-table-config/my-table-config';
import {utenti} from './environments/utenti';
import {Utenti} from './models/utenti';
import {UserService} from './services/user.service';
import {FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  data: Utenti[] = utenti;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
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


  getAction(action: MyAction, id: number) {
    switch (action.type) {
      case MyTableActionEnum.DELETE:
        this.data = this.data.filter(utente => utente.id !== id);
        this.userService.deleteUser(id)
        break;

      case MyTableActionEnum.EDIT:
        this.router.navigate(['utenti/', id])
        break;

      case MyTableActionEnum.NEW_ROW:
        this.router.navigate(['utenti/', id])
        break;
    }

  }


}
