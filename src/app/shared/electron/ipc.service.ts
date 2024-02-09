import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpcService {
  private ipc: IpcRenderer | undefined;
  private resizeCompleteSubject = new Subject<void>();

  constructor() {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron IPC was not loaded');
    }

    if (this.ipc) {
      this.ipc.on('resize-complete', () => {
        this.resizeCompleteSubject.next();
      });
    }
  }

  public onResizeComplete(): Observable<void> {
    return this.resizeCompleteSubject.asObservable();
  }

  public send(channel: string, ...args: any[]): void {
    if (this.ipc) {
      this.ipc.send(channel, ...args);
    }
  }

  public on(channel: string, listener: (event: any, ...args: any[]) => void): void {
    if (this.ipc) {
      this.ipc.on(channel, listener);
    }
  }

  public resizeWindow(width: number, height: number, isAnimated: boolean): void {
    this.send('resize-window', width, height, isAnimated);
  }
}
