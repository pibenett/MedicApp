import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { FlashMessagesService } from 'angular2-flash-messages';
import { MessagingService } from '../../../shared/services/messaging.service';
import { FollowupService } from '../../../shared/services/followup.service';

import { Notif } from 'app/shared/models/Notif';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  displayedColumns = ['patientFirstName', 'patientLastName', 'patientBirthdate', 'type', 'date', 'read', 'links'];
  notifs: MatTableDataSource<Notif> = new MatTableDataSource();
  subscription: Subscription;
  notif$: Observable<any>;
  userId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private msgService: MessagingService,
    private followupService: FollowupService,
    private messagingService: MessagingService,
    private flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router
) { }

  ngOnInit() {
    this.notif$ = this.msgService.currentMessage;
    // Get userId from url
    this.userId = this.route.snapshot.params['userId'];
    // Get notifications list
    this.subscription = this.msgService.getMessages(this.userId).subscribe(
      notifs => {
        this.notifs = new MatTableDataSource(notifs);
        this.notifs.paginator = this.paginator;
        this.notifs.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.notifs.filter = filterValue;
  }

  onClickEditReadStatus(notif) {
    this.followupService.updateFollowupAlert(this.userId, notif.key, {read: true});
    this.router.navigate([notif.data.link], { queryParams: { returnUrl: this.userId + '/notifications' }});
  }

  onDeleteClick(notifId: string) {
    if (confirm('Are you sure to delete?')) {
      this.messagingService.deleteNotif(this.userId, notifId);
      this.flashMessagesService.show('Notification removed', { cssClass: 'alert-success fixed-top', timeout: 2000 });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
