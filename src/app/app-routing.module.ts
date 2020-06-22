import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgTableComponent } from './ng-table/ng-table.component';


const routes: Routes = [
  { path: 'table', component: NgTableComponent },
  { path: '', redirectTo: 'table', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
