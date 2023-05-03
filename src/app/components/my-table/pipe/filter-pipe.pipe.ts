import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";


@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any[], filterString: string, property: string): any[] {
    if (value.length === 0 || !filterString) {
      return value;
    }
    let filtered: any[] = [];
    for (let user of value) {
      if (user[property].toLowerCase().includes(filterString.toLowerCase())) {
        filtered.push(user);
      }
    }
    return filtered;
  }

}
