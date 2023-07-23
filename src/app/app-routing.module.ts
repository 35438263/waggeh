import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    loadChildren : () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path:'consultant',
    loadChildren : () => import('./consultant/consultant.module').then((m) => m.ConsultantModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
