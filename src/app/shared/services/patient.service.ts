import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment/src/moment.js';

import { Patient } from '../models/Patient';

const moment =  _moment || _rollupMoment;

@Injectable()
export class PatientService {

  patientsListRef: AngularFireList<Patient>;
  patients$: Observable<Patient[]>;
  patient$: Observable<Patient>;

  constructor(
    private db: AngularFireDatabase
  ) {
      this.patientsListRef = this.db.list('/patients');
      this.patients$ = this.patientsListRef.snapshotChanges().map(patients => {
        return patients.map(patient =>
          ({
            key: patient.payload.key,
            age: moment(patient.payload.val().birthdate).locale('fr').from(new moment(), true),
            ...patient.payload.val()
          })
        );
      });
    }

  getPatients() {
    return this.patients$;
  }

  addPatient(patient: Patient) {
    this.patientsListRef.push(patient);
  }

  getPatient(id: string) {
    this.patient$ = this.db.object('patients/' + id).valueChanges();
    return this.patient$;
  }

  updatePatient(patientId: string, patient: Patient) {
    return this.patientsListRef.update(patientId, patient);
  }

  deletePatient(id: string) {
    return this.patientsListRef.remove(id);
  }

}
