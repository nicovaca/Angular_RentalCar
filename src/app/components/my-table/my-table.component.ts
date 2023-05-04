import {Component, Input, OnInit} from '@angular/core';
import {MyTableConfig} from 'src/app/configs/my-table-config/my-table-config';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {

  @Input() tableConfig!: MyTableConfig;
  @Input() data!: any [];

  key!: string;
  orderType!: string;
  enable: boolean = false;
  filter: any;
  filterKey: any;



  ngOnInit(): void {
    this.key = this.tableConfig.order.defaultColumn;
    this.orderType = this.tableConfig.order.orderType;
  }


  sort(key: string) {
    this.key = key;
    if (this.orderType == "desc") {
      this.orderType = "asc"
    } else {
      this.orderType = "desc"
    }
    this.enable = true;
  }
}
