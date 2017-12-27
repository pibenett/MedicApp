// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { PatientService } from 'shared/services/patient.service';
import { MessagingService } from 'shared/services/messaging.service';
import { AuthService } from 'shared/services/auth.service';
import { FollowupService } from 'shared/services/followup.service';
import { UserService } from 'shared/services/user.service';
import { FirebaseStorageService } from 'app/shared/services/firebase-storage.service';


@NgModule({
  imports: [
    CommonModule,
    FlashMessagesModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  declarations: [],
  providers: [
    FirebaseStorageService,
    PatientService,
    FollowupService,
    UserService,
    AuthService,
    MessagingService
  ],
  exports: [
    CommonModule,
    FlashMessagesModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ]
})
export class SharedModule { }
