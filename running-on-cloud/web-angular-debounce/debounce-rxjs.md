![ui](https://raw.github.com/leblancmeneses/presentation-raspberrypi-firebase/master/running-on-cloud/web-angular-debounce/ui.png)


```
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { debounceTime, map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  emitToggleGarage: Subject<string> = new Subject<string>();
  toggleList;

  constructor(
    private db: AngularFireDatabase,
    private fbAuth: AngularFireAuth,
    public snackBar: MdSnackBar) {
      this.toggleList = this.db.list('/queues/toggle/tasks');
        
      this.emitToggleGarage.pipe(
        debounceTime(500), // wait 500ms after the last event before emitting last event
        map(x => x)
      )
      .subscribe(async (model) => {
          try {
            await this.toggleList.push({
              createdBy: this.fbAuth.auth.currentUser.uid,
              createdDate: firebase.database.ServerValue.TIMESTAMP,
              lat: 0,  // todo(lmeneses): open when entering geo fence.
              long: 0
            });
            this.snackBar.open('Action completed.', undefined, {
              duration: 10000,
              extraClasses: ['success']
            });
          } catch (ex) {
            this.snackBar.open(ex, undefined, {
              duration: 10000,
              extraClasses: ['error']
            });
          }
      });
  }

  ngOnInit() {
  }

  async onToggleGarage() {
    this.emitToggleGarage.next('');
  }
}
```
