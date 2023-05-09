import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MyTableComponent } from './components/my-table/my-table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



//Pipe
import { FilterPipePipe } from './components/my-table/pipe/filter-pipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortPipePipe } from './components/my-table/pipe/sort-pipe.pipe';
import { PaginationPipe } from './components/my-table/pipe/pagination.pipe';
import { RouterModule } from '@angular/router';
import { FormUtenteComponent } from './components/form-utente/form-utente.component';








@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    MyTableComponent,
    FilterPipePipe,
    SortPipePipe,
    PaginationPipe,
    FormUtenteComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'utenti/:id', component: FormUtenteComponent},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
