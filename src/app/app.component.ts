import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {MyAction} from './configs/configClass/my-action';
import {MyTableActionEnum} from './configs/configClass/my-table-action-enum';
import {MyButtonConfig} from './configs/my-button-config/my-button-config';
import {MyTableConfig} from './configs/my-table-config/my-table-config';
import {utenti} from './environments/utenti';
import {FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';



}
