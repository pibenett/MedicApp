import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Upload } from 'app/shared/models/Upload';
import { Followup } from 'app/shared/models/Followup';

@Injectable()
export class FirebaseStorageService {

  storageRef: firebase.storage.Reference;
  imageList: Observable<Upload[]>;
  uploads: AngularFireList<Upload[]>;
  followupId: string;
  uploads$: Observable<Upload[]>;

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) {
  this.storageRef = firebase.storage().ref();
}

getUploads(followupId: string) {
  this.uploads$ = this.db.list('/uploads/' + followupId).snapshotChanges().map(uploads => {
    return uploads.map(upload => {
      return { key: upload.payload.key, ...upload.payload.val() };
    });
  });
  return this.uploads$;
}

pushUpload(upload: Upload, followupId: string) {
  const uploadTask = this.storageRef.child('/uploads/' + followupId + '/' + upload.file.name).put(upload.file);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) =>  {
      // upload in progress
      upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
    },
    (error) => {
      // upload failed
      console.log(error);
    },
    () => {
      // upload success
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      this.saveFileData(upload, followupId);
    }
  );
}

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, followupId: string) {
    this.db.list('/uploads/' + followupId + '/').push(upload);
  }

  deleteUploads(followup$: Followup) {
    followup$.uploads.forEach(upload => {
      this.deleteFileData(upload.key, followup$.key)
      .then( () => {
        this.deleteFileStorage(upload.name, followup$.key);
      })
      .catch(error => console.log(error));
    });
  }

  // Deletes the file details from the realtime db
  private deleteFileData(uploadKey: string, followupKey: string) {
    return this.db.list('/uploads/' + followupKey + '/').remove(uploadKey);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(uploadName: string, followupKey: string) {
    this.storageRef.child('/uploads/' + followupKey + '/' + uploadName).delete();
  }

}
