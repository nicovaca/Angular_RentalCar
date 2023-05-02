import {Component} from '@angular/core';
import {MyButtonConfig} from './configs/my-button-config/my-button-config';
import {MyTableConfig} from './configs/my-table-config/my-table-config';
import { utenti } from './environments/utenti';
import {Utenti} from './models/utenti';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';

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
      {key: "email", label: "Email"}
    ],
    order: {defaultColumn: "nome", orderType: "desc"}

  }

  data: Utenti[] = utenti;

}
