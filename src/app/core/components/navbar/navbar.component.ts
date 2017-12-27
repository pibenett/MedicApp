import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../../shared/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { MessagingService } from '../../../shared/services/messaging.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isLoggedIn: boolean;
  loggedUser;
  userId: string;
  notification$: Observable<any>;
  notifications$: Observable<any>[];
  notifCounter: number;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessagesService,
    private msgService: MessagingService,
  ) { }

  ngOnInit() {
    this.subscription = this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.userId = user.uid;
        this.userService.getUser(user.uid).take(1).subscribe((u) => this.loggedUser = u);
        // Subscribe to new notification
        this.msgService.getPermission();
        this.msgService.receiveMessage();
        this.notification$ = this.msgService.currentMessage;
        // Get notifications counter
        this.msgService.getMessages(this.userId).subscribe(notifications => {
          this.notifCounter = 0;
          for (const notification of notifications) {
            if (!notification.data.read) {
              this.notifCounter++;
            }
          }
        });
      }
    });

  }
  onLogoutClick() {
    this.authService.logout();
    this.flashMessageService.show('You are logged out', { cssClass: 'alert-success fixed-top', timeout: 2000 });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
