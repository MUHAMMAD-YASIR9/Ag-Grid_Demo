import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridExampleComponent } from './ag-grid-example/ag-grid-example.component';
import { GridsterExampleComponent } from './gridster-example/gridster-example.component';

const routes: Routes = [
  {
    path: '',
    component: AgGridExampleComponent
  },{
    path: 'test',
    component: AgGridExampleComponent
  },
  {path:'Grid', component:GridsterExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
