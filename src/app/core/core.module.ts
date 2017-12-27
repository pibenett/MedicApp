import { PatientsModule } from './../patients/patients.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'app/core/components/navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/guards/auth.guard';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    PatientsModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class CoreModule { }
