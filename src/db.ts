import { Connection } from '@shared/interfaces/connection';
import Dexie, { Table } from 'dexie';

export class AppDB extends Dexie {
  connections!: Table<Connection, number>;

  constructor() {
    super('ae-dbm');

    this.version(5).stores({
      connections: '++id',
    });

    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.connections.add({
      id: 1,
      name: 'test',
      host: '127.0.0.1',
      port: '3306'
    });
  }
}

export const db = new AppDB();
