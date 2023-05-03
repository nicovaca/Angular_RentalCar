import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MyTableComponent } from './components/my-table/my-table.component';



//Pipe
import { SortPipe } from './components/my-table/pipe/pipe.pipe';
import { FilterPipePipe } from './components/my-table/pipe/filter-pipe.pipe';







@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    MyTableComponent,
    SortPipe,
    FilterPipePipe

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
