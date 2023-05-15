import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MyAction} from 'src/app/configs/configClass/my-action';
import {MyTableActionEnum} from 'src/app/configs/configClass/my-table-action-enum';
import {MyButtonConfig} from 'src/app/configs/my-button-config/my-button-config';
import {MyTableConfig} from 'src/app/configs/my-table-config/my-table-config';
import {utenti} from 'src/app/environments/utenti';
import {Veicolo} from 'src/app/models/veicolo';
import {VeicoliService} from 'src/app/services/veicoli.service';

@Component({
  selector: 'app-veicoli',
  templateUrl: './veicoli.component.html',
  styleUrls: ['./veicoli.component.css']
})
export class VeicoliComponent implements OnInit {

  veicoli: Veicolo[] = [];


  constructor(
    private router: Router,
    private veicoliService: VeicoliService,
  ) {
  }



  ngOnInit(): void {
        this.getVeicoli();
    }


  getVeicoli() {
        this.veicoliService.getVeicoli()
          .subscribe(veicoli => (this.veicoli=veicoli));
    }


  headersTable: MyTableConfig = {
    headers: [
      {key: "id", label: "Id"},
      {key: "casaCostruttrice", label: "Casa Costruttrice"},
      {key: "modello", label: "Modello"},
      {key: "annoImmatricolazione", label: "Anno di Immatricolazione"},
      {key: "targa", label: "Targa"},
      {key: "tipoVeicolo", label: "Tipo di Veicolo"},
    ],
    order: {defaultColumn: "id", orderType: "desc"},
    search: {columns: ["modello", "casaCostruttrice"]},
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
          text: 'Aggiungi Veicolo'
        }, newRowButton: true
      }

    ]
  }


  getAction(action: MyAction, object:any) {

    let id:number = object? object.id : 0


    console.log(id)
    switch (action.type) {
      case MyTableActionEnum.DELETE:

        this.veicoli = this.veicoli.filter(v => v.id !== id);
        this.veicoliService.deleteVeicolo(id).subscribe();
        break;

      case MyTableActionEnum.EDIT:
        this.router.navigate(['veicoli/', id])
        break;

      case MyTableActionEnum.NEW_ROW:
        let idNew=0
        this.router.navigate(['veicoli/', idNew])
        break;
    }

  }
}
