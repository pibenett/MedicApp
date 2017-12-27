import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Rx';
import { map } from 'rxjs/Operator/map';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment/src/moment.js';

import { PatientService } from '../../../shared/services/patient.service';

import { Patient } from '../../../shared/models/Patient';

const moment =  _moment || _rollupMoment;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit, OnDestroy {

  displayedColumns = ['firstName', 'lastName', 'gender', 'birthdate', 'age', 'links'];
  patients: MatTableDataSource<Patient> = new MatTableDataSource();
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.subscription = this.patientService.getPatients().subscribe(patients => {
      this.patients = new MatTableDataSource(patients);
      this.patients.paginator = this.paginator;
      this.patients.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.patients.filter = filterValue;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
