import { Injectable } from '@angular/core';
import { fromEvent, map, merge, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  networkObservable$: Observable<boolean>;

  constructor() {
    const online$ = fromEvent(window, 'online').pipe(
      map(() => true)
    );
    const offline$ = fromEvent(window, 'offline').pipe(
      map(() => false)
    );

    this.networkObservable$ = merge(online$, offline$);
  }

  getInitialStatus(): boolean {
    return navigator.onLine;
  }
}
