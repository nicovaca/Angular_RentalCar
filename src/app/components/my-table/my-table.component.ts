import { Component, Input } from '@angular/core';
import { MyTableConfig } from 'src/app/configs/my-table-config/my-table-config';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {

  @Input () tableConfig! : MyTableConfig ;
  @Input () data! : any [];




   /* getValue(key:string, object:any):string {
    return object[key];
  }*/
}
