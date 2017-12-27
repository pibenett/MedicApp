import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown';


import { FollowupDetailsComponent } from 'app/patients/components/followup-details/followup-details.component';
import { FollowupFormComponent } from 'shared/components/followup-form/followup-form.component';
import { PatientDetailsComponent } from 'app/patients/components/patient-details/patient-details.component';
import { PatientFollowupComponent } from 'app/patients/components/patient-followup/patient-followup.component';
import { PatientFormComponent } from 'app/patients/components/patient-form/patient-form.component';
import { PatientsComponent } from 'app/patients/components/patients/patients.component';

import { AuthGuard } from 'shared/guards/auth.guard';

const patientsRoutes: Routes = [
  {path: '', component: PatientsComponent, canActivate: [AuthGuard]},
  {path: 'patient-form', component: PatientFormComponent, canActivate: [AuthGuard]},
  {path: 'patient-form/:patientId', component: PatientFormComponent, canActivate: [AuthGuard]},
  {path: 'patient/:patientId', component: PatientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'patient/:patientId/followup', component: PatientFollowupComponent, canActivate: [AuthGuard]},
  {path: 'patient/:patientId/followup/:followupId', component: FollowupDetailsComponent, canActivate: [AuthGuard]},
  {path: 'patient/:patientId/followup/edit/:followupId', component: FollowupFormComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularMaterialModule,
    AngularMultiSelectModule,
    RouterModule.forChild(patientsRoutes)
  ],
  declarations: [
    PatientsComponent,
    PatientDetailsComponent,
    PatientFollowupComponent,
    FollowupDetailsComponent,
    PatientFormComponent,
    FollowupFormComponent,
  ],
  exports: [
  ]
})
export class PatientsModule { }
