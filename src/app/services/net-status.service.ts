import { Injectable } from '@angular/core';
import {BehaviorSubject, debounceTime, fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetStatusService {
  netStatus = 'offline';
  available = false;
  constructor() {
    this.available= navigator.onLine;
    fromEvent(window,'offline').pipe(
      debounceTime(100)).subscribe((event:Event) => {
      this.netStatus=event.type;
      this.available = false;
    });
    fromEvent(window,'online').pipe(
      debounceTime(100)).subscribe((event:Event) => {
      this.netStatus=event.type;
      this.available = true;
    });
  }
}
