import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {MyTableConfig} from 'src/app/configs/my-table-config/my-table-config';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit, OnChanges {


  @Input() tableConfig!: MyTableConfig;
  @Input() data!: any [];

  key!: string;
  orderType!: string;
  enable: boolean = false;
  filter: any;
  filterKey: any;
  totalPages!: number[];
  currentPage: number = 1;
  pages: number[] = [];
  itemPerPage!: number;


  ngOnInit(): void {
    this.key = this.tableConfig.order.defaultColumn;
    this.orderType = this.tableConfig.order.orderType;
    this.itemPerPage = this.tableConfig.pagination.itemPerPage;
    this.totalPages = new Array(Math.ceil(this.data.length / this.itemPerPage));
    this.pages = this.range(this.currentPage, this.totalPages.length);
  }


  range(start: number, end: number): number[] {
    if (this.currentPage - 1 === 0) {
      return [this.currentPage, this.currentPage + 1]
    } else if (this.currentPage + 1 === this.totalPages.length + 1) {
      return [this.currentPage - 1, this.currentPage]
    } else {
      return [this.currentPage - 1, this.currentPage, this.currentPage + 1]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
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


  /** Set page number */
  selectPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pages = this.range(this.currentPage, this.totalPages.length);
  }

  /** Set next page number */
  next() {
    if (this.currentPage <= this.totalPages.length) {
      const nextPage = this.currentPage + 1;
      this.changePage(nextPage);
      this.pages = this.range(nextPage, this.totalPages.length);
    }
  }

  /** Set previous page number */
  previous() {
    if (this.currentPage >= 1) {
      const previousPage = this.currentPage - 1;
      this.changePage(previousPage);
      this.pages = this.range(previousPage, this.totalPages.length);
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
  }


  selectItemPerPage(event: Event) {
    let item = (event.target as HTMLSelectElement).value
    if (item == "All") {
      this.itemPerPage = this.data.length;
    } else {
      this.itemPerPage = Number(item);
    }
    this.totalPages = new Array(Math.ceil(this.data.length / this.itemPerPage));
    if (this.currentPage>=this.totalPages.length) {
      this.currentPage=this.totalPages.length;
    }
    this.pages = this.range(this.currentPage, this.totalPages.length);
  }
}
