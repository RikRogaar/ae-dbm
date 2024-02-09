import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { Observable, from, of } from 'rxjs';
import { db } from '../../../db';
import { Connection } from '@shared/interfaces/connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {

  constructor() { }

  public index() {
    console.log('triggered')
    return from(liveQuery(() => db.connections.toArray()));
  }

  public create(item: Connection): Observable<Connection> {
    db.connections.add(item);

    return of(item);
  }
}
