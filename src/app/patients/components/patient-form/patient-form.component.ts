import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment/src/moment.js';

import { FlashMessagesService } from 'angular2-flash-messages';
import { PatientService } from '../../../shared/services/patient.service';

import { Patient } from '../../../shared/models/Patient';

const moment =  _moment || _rollupMoment;

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})

export class PatientFormComponent implements OnInit {

  patient: Patient = {
    address: {},
    allergies: []
  };
  patientId: string;
  genders = ['Male', 'Female'];
  allergies = [
    {'id': 1, 'itemName': 'Allergie 1'},
    {'id': 2, 'itemName': 'Allergie 2'},
    {'id': 3, 'itemName': 'Allergie 3'},
  ];
  dropdownSettings = {
    singleSelection: false,
    text: 'Check the patient allergies',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: ''
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
  ) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    if (this.patientId) {
      this.patientService.getPatient(this.patientId).take(1).subscribe(patient => {
        // Convert custom format to moment date
        patient.birthdate = new moment(patient.birthdate);
        this.patient = patient;
      });
    }
  }

  onSubmit({value, valid}: {value: Patient, valid: boolean}) {
    // Redirect to patient form if invalid
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger fixed-top', timeout: 2000 });
      this.router.navigate(['patient-form']);
    }else {
      // Convert moment date to custom format
      value.birthdate = value.birthdate.locale('fr').format();
      // Update if editing a patient
      if (this.patientId) {
        this.patientService.updatePatient(this.patientId, value);
        this.flashMessagesService.show('Patient Edited', { cssClass: 'alert-success fixed-top', timeout: 2000 });
        this.router.navigate(['/']);
      // Add a new patient
      }else {
        this.patientService.addPatient(value);
        this.flashMessagesService.show('Patient Added', { cssClass: 'alert-success fixed-top', timeout: 2000 });
        this.router.navigate(['/']);
      }
    }
  }
}

