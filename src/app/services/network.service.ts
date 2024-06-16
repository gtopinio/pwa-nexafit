import { Injectable } from '@angular/core';
import { fromEvent, map, merge, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

  createNetworkObservable() : Observable<boolean> {
    const online$ = fromEvent(window, 'online').pipe(
      map(() => true)
    );
    const offline$ = fromEvent(window, 'offline').pipe(
      map(() => false)
    );

    return merge(online$, offline$);
  }
}
