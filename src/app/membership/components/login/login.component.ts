import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
    .then((res) => {
      this.flashMessageService.show('You are logged in', { cssClass: 'alert-success fixed-top', timeout: 2000 });
      this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([this.returnUrl || '/']);
    })
    .catch((err) => {
      this.flashMessageService.show(err.message, { cssClass: 'alert-danger fixed-top', timeout: 2000 });
      this.router.navigate(['/login']);
    });
  }

}
