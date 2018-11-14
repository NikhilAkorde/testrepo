import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormsComponent } from './forms/forms.component';
import * as firebase from 'firebase';
import { AppRoutingModule } from './/app-routing.module';
import { PrintPageComponent } from './print-page/print-page.component';
import { AlldataComponent } from './alldata/alldata.component';

var config = {
    apiKey: "AIzaSyD18N333BE07AmP-QFx4chBMAvSSLRr9L8",
    authDomain: "dataentrydemo-ba86a.firebaseapp.com",
    databaseURL: "https://dataentrydemo-ba86a.firebaseio.com",
    projectId: "dataentrydemo-ba86a",
    storageBucket: "dataentrydemo-ba86a.appspot.com",
    messagingSenderId: "345995260113"
  };
  firebase.initializeApp(config);


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormsComponent,
    PrintPageComponent,
    AlldataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
