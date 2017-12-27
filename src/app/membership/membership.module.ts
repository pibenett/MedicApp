import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/membership/components/login/login.component';
import { RegisterComponent } from 'app/membership/components/register/register.component';
import { FormsModule } from '@angular/forms';

const membershipRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(membershipRoutes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class MembershipModule { }
