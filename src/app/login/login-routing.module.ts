import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';
import { ContinueSignUpComponent } from './continue-sign-up/continue-sign-up.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'signUp',
    component:SignupComponent
  },{
    path:'continueSignUp',
    component:ContinueSignUpComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
