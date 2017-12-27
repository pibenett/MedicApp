import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { default as _rollupMoment } from 'moment/src/moment.js';
import * as _ from 'lodash';
import * as _moment from 'moment';
import * as firebase from 'firebase';

import { AuthService } from '../../../shared/services/auth.service';
import { FollowupService } from '../../../shared/services/followup.service';
import { PatientService } from 'app/shared/services/patient.service';
import { FirebaseStorageService } from 'app/shared/services/firebase-storage.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../../shared/services/user.service';

import { Followup } from '../../../shared/models/Followup';
import { Notif } from '../../../shared/models/Notif';
import { Upload } from 'app/shared/models/Upload';

const moment =  _moment || _rollupMoment;

@Component({
  selector: 'app-followup-form',
  templateUrl: './followup-form.component.html',
  styleUrls: ['./followup-form.component.css']
})

export class FollowupFormComponent implements OnInit {

  patientId: string;
  followupId: string;
  userId: string;
  types = ['Compte rendu operatoire', 'Ordonnance', 'Compte rendu examen', 'Note de dossier', 'Antecedent'];
  selectedFiles: FileList;
  currentUpload: Upload;
  followup: Followup = {
    date: new moment().locale('fr')
  };
  notif: Notif = {
    data: {
      read: false
    }
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private followupService: FollowupService,
    private authService: AuthService,
    private userService: UserService,
    private patientService: PatientService,
    private firebaseStorageService: FirebaseStorageService
  ) { }

  ngOnInit() {
    // Get patient id from url
    this.patientId = this.route.snapshot.params['patientId'];
    // Get followup id from url on editing
    this.followupId = this.route.snapshot.paramMap.get('followupId');
    if (this.followupId) {
      this.followupService.getFollowUp(this.patientId, this.followupId).take(1).subscribe(followup => {
        // Convert custom format to moment date
        followup.date = new moment(followup.date);
        this.followup = followup;
      });
    }
  }

  onSubmit({value, valid}: {value: Followup, valid: boolean}) {
    // Redirect if invalid
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger fixed-top', timeout: 2000 });
      if (!this.followupId) {
        this.router.navigate(['patient/' + this.patientId + '/followup']);
      }else {
        this.router.navigate(['patient/' + this.patientId + '/followup/edit/' + this.followupId]);
      }
    // Add followup if valid
    }else {
      // Convert moment date to custom format
      value.date = value.date.format();
      if (this.followupId) {
        // Edit exiting followup
        this.followupService.updateFollowup(this.patientId, this.followupId, value);
        this.flashMessagesService.show('Followup Edited', { cssClass: 'alert-success fixed-top', timeout: 2000 });
      }else {
        // Add new followup to this patient
        this.followupId = this.followupService.newFollowUp(this.patientId, value);
        this.flashMessagesService.show('Follow up Added', { cssClass: 'alert-success fixed-top', timeout: 2000 });
        // Toggle for button
        this.toggleFormBtn();
      }
      // Edit new alert if alert box is checked
      if (value.alert) {
        // Get the patient first and last name to join them to the notif
        this.patientService.getPatient(this.patientId).subscribe(patient => {
          this.notif.data.patientFirstName = patient.firstName;
          this.notif.data.patientLastName = patient.lastName;
          this.notif.data.patientBirthdate = patient.birthdate;
        });
        this.notif.title = value.type;
        this.notif.body = value.name;
        this.notif.data.link = 'patient/' + this.patientId + '/followup/' + this.followupId ;
        this.notif.data.date = value.date;
        // Get the userIds list and push the alert
        this.userService.getUsers().subscribe(users => {
          for (const user of users) {
            this.followupService.addFollowupAlert(user.key, this.notif);
          }
        });
      }
      // Upload optional file(s)
      if (this.selectedFiles) {
        this.upload();
      }
      this.router.navigate(['patient/' + this.patientId + '/followup']);
    }
  }

  toggleFormBtn() {
    this.followupService.followupFormIsActive = !this.followupService.followupFormIsActive;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
}

  upload() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.firebaseStorageService.pushUpload(this.currentUpload, this.followupId);
    });
  }

}
