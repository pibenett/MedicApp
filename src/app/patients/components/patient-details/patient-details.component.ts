import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PatientService } from '../../../shared/services/patient.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Patient } from '../../../shared/models/Patient';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})

export class PatientDetailsComponent implements OnInit {

  patientId: string;
  patient$: Patient;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.patientId = this.route.snapshot.params['patientId'];
    // Get patient
    this.patientService.getPatient(this.patientId).take(1).subscribe(patient => {
    this.patient$ = patient;
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure to delete?')) {
      this.patientService.deletePatient(this.patientId);
      this.flashMessagesService.show('Patient removed', { cssClass: 'alert-success fixed-top', timeout: 2000 });
      this.router.navigate(['/']);
    }
  }

}
