import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FirebaseStorageService } from 'app/shared/services/firebase-storage.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FollowupService } from '../../../shared/services/followup.service';

import { Followup } from '../../../shared/models/Followup';

@Component({
  selector: 'app-followup-details',
  templateUrl: './followup-details.component.html',
  styleUrls: ['./followup-details.component.css']
})
export class FollowupDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  patientId: string;
  followupId: string;
  followup$: Followup;
  returnUrl: string;

  constructor(
    private followupService: FollowupService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private firebaseStorageService: FirebaseStorageService
  ) { }

  ngOnInit() {
    // Get patient id from url
    this.patientId = this.route.snapshot.params['patientId'];
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    // Get followup id from url
    this.followupId = this.route.snapshot.params['followupId'];
    // Get followup from firebase
    this.subscription =  this.followupService.getFollowUp(this.patientId, this.followupId).subscribe(followup => {
      this.firebaseStorageService.getUploads(this.followupId)
      .subscribe(uploads => {
        this.followup$.uploads = uploads;
      });
      this.followup$ = followup;
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure to delete?')) {
      this.followupService.deleteFollowUp(this.followupId);
      this.firebaseStorageService.deleteUploads(this.followup$);
      this.flashMessagesService.show('Follow-up removed', { cssClass: 'alert-success fixed-top', timeout: 2000 });
      this.router.navigate(['/patient/' + this.patientId + '/followup']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
