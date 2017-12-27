import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  usersRef: AngularFireList<any>;
  users$: Observable<any[]>;
  user$: Observable<any>;

  constructor(
    private db: AngularFireDatabase
  ) {
      this.usersRef = this.db.list('/fcmTokens');
      this.users$ = this.usersRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
      });
  }

    getUsers() {
      return this.users$;
    }

    getUser(userId: string) {
      this.user$ = this.db.object('users/' + userId).valueChanges();
      return this.user$;
    }

    saveUser(userId, user) {
      this.db.object('/users/' + userId).update({
        firstName: user.firstName,
        lastName: user.lastName,
        mail: user.email,
      });
    }

}
