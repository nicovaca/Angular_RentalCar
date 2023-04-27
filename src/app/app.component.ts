import { Component } from '@angular/core';
import { MyButtonConfig } from './my-button-config';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';

  bottoneHome: MyButtonConfig = {
    customCssClass:'btn btn-primary',
    icon:'fa fa-home',
    text:'Home'
  }

  bottoneElimina: MyButtonConfig = {
    customCssClass:'btn btn-danger',
    icon:'fa fa-trash',
    text:'Elimina'
  }
}
