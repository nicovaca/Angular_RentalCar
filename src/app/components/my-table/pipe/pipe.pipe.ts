import { Injectable, Pipe, PipeTransform } from '@angular/core';


export type SortOrder = 'asc' | 'desc';

@Injectable()
@Pipe({
  name: 'sortPipe',
})
export class SortPipe implements PipeTransform {
  transform(list:any, key: string, order: string): any[] {
    if(order === 'asc') {
      order ='desc';
      return list.sort(this.compareValues(key, 'desc'));
    } else {
      order ='asc';
      return list.sort(this.compareValues(key, 'asc'));
    }
  }

  compareValues(key:string, order:string) {
    return function innerSort(a:any, b:any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
}
