import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
  return this.afAuth.authState.map(auth => {
    if (!auth) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }else {
      return true;
    }
  });

}

}

