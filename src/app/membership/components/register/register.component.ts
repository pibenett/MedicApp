import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { UserService } from '../../../shared/services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}) {
    // Message and redirect the user if invalid
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields correctly', { cssClass: 'alert-danger fixed-top', timeout: 2000 });
      this.router.navigate(['/register']);
    }else {
    // Register the user if valid
    this.authService.register(value.email, value.password)
    .then((newUser: any) => {
      const userId = newUser.uid;
      // Save user in the DB
      this.userService.saveUser(userId, value);
      this.flashMessagesService.show('New user registered', { cssClass: 'alert-success fixed-top', timeout: 2000 });
      this.router.navigate(['/']);
    })
    .catch((err) => {
      this.flashMessagesService.show(err.message, { cssClass: 'alert-danger fixed-top', timeout: 2000 });
      this.router.navigate(['/register']);
    });
    }
  }

  firstCharToUppercase(target) {
    return target.name = target.value = target.value.charAt(0).toUpperCase() + target.value.slice(1);
  }
}
