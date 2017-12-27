// Modules
import { NgModule } from '@angular/core';
import { MembershipModule } from './membership/membership.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { PatientsModule } from './patients/patients.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'app/core/core.module';

// Angularfire
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/components/notifications/notifications.component';

// Guards
import { AuthGuard } from './shared/guards/auth.guard';

// Firebase
import * as firebase from 'firebase';

// Initialize Firebase SDK
firebase.initializeApp(environment.firebase);

const appRoutes: Routes = [
  {path: ':userId/notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent
  ],
  imports: [
    CoreModule,
    AngularMaterialModule,
    SharedModule,
    PatientsModule,
    MembershipModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'medicapp'),
  ],

  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
