import { Injectable, computed, inject, signal } from '@angular/core';
import { ConnectionApiService } from './connection-api.service';
import { Connection } from '@shared/interfaces/connection';
import { Subject, map, merge, switchMap } from 'rxjs';
import { connect } from 'ngxtension/connect';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private apiService = inject(ConnectionApiService);
  public connections = computed(() => this.state().connections);
  public add$ = new Subject<Connection>();

  private state = signal<ConnectionState>({
    connections: []
  });

  private connections$ = merge(
    this.apiService.index(),
    this.add$.pipe(
      switchMap(() => this.apiService.index())
    )
  );

  constructor() {
    const nextConnections$ = merge(
      this.connections$.pipe(
        map((connections) => ({
          connections: connections,
        }))
      ),
    );

    connect(this.state)
      .with(nextConnections$);
  }
}

interface ConnectionState {
  connections: Connection[];
}
