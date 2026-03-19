import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoEventsService {

  private refreshSubject = new Subject<void>();

  private cancelRequestSubject = new Subject<void>();

  private tabChangeSubject = new Subject<void>();

  tabChanged$ = this.tabChangeSubject.asObservable();

  cancelRequests$ = this.cancelRequestSubject.asObservable();

  notifyTabChange() {
  this.tabChangeSubject.next();
  }

  cancelRequests() {
    this.cancelRequestSubject.next();
  }

  refresh$ = this.refreshSubject.asObservable();

  notifyRefresh() {
    this.refreshSubject.next();
  }

}
