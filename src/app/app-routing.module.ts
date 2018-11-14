import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsComponent } from './forms/forms.component';
import {TableComponent } from './table/table.component';
import {PrintPageComponent } from './print-page/print-page.component';
import {AlldataComponent } from './alldata/alldata.component';
import { RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  
  { path: 'table', component: TableComponent},
  {path:'forms', component: FormsComponent },
  {path:'print-page' , component:PrintPageComponent},
  {path:'alldata' , component:AlldataComponent},
  
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
