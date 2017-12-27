import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { FollowupService } from '../../../shared/services/followup.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Followup } from '../../../shared/models/Followup';


@Component({
  selector: 'app-patient-followup',
  templateUrl: './patient-followup.component.html',
  styleUrls: ['./patient-followup.component.css']
})
export class PatientFollowupComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'type', 'date', 'details'];
  followups: MatTableDataSource<Followup> = new MatTableDataSource();
  patientId: string;
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public followupService: FollowupService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.followupService.followupFormIsActive = false;
    // Get id from url
    this.patientId = this.route.snapshot.params['patientId'];
    // Get followups
    this.subscription = this.followupService.getFollowUps(this.patientId).subscribe(
      followups => {
        this.followups = new MatTableDataSource(followups);
        this.followups.paginator = this.paginator;
        this.followups.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.followups.filter = filterValue;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
