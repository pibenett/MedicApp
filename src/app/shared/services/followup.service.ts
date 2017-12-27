import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { Followup } from '../models/Followup';
import { Notif } from '../models/Notif';

@Injectable()
export class FollowupService {
  followupsRef: AngularFireList<any>;
  followupAlertRef: AngularFireObject<any>;
  followups: Observable<any[]>;
  followup: Observable<any>;
  followupFormIsActive: Boolean = false;
  alertsRef: AngularFireList<any>;
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
  ) {}

  newFollowUp(id: string, followup: Followup) {
    this.followupsRef = this.db.list('/patients/' + id + '/followup/');
    return this.followupsRef.push(followup).key;
  }

  addFollowupAlert(userId: string, alertMessage: Notif ) {
    this.alertsRef = this.db.list('/messages/' + userId);
    return this.alertsRef.push(alertMessage);
  }

  updateFollowupAlert(userId: string, alertId: string, data) {
    this.followupAlertRef = this.db.object('/messages/' + userId + '/' + alertId + '/data/');
    return this.followupAlertRef.update(data);
  }

  getFollowUps(id: string) {
    this.followupsRef = this.db.list('/patients/' + id + '/followup/');
    this.followups = this.followupsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}) );
    });
    return this.followups;
  }

  getFollowUp(patientId: string, followupId: string) {
    this.followup = this.db.object('/patients/' + patientId + '/followup/' + followupId).snapshotChanges().map(followup => {
      return {key: followup.payload.key, ...followup.payload.val()};
    });
    return this.followup;
  }

  updateFollowup(patientId: string, followupId: string, followup: Followup) {
    this.followupsRef = this.db.list('/patients/' + patientId + '/followup/');
    return this.followupsRef.update(followupId, followup);
  }

  deleteFollowUp(followupId: string) {
    return this.followupsRef.remove(followupId);
  }

}
