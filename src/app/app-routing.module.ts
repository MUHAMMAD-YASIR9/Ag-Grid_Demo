import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridExampleComponent } from './ag-grid-example/ag-grid-example.component';

const routes: Routes = [
  {
    path: '',
    component: AgGridExampleComponent
  },{
    path: 'test',
    component: AgGridExampleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
