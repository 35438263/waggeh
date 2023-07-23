import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultantComponent } from './consultant/consultant.component';

const routes: Routes = [
  {
    path:'',
    component:ConsultantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantRoutingModule { }
