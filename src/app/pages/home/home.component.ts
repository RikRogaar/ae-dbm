import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IpcService } from '@shared/electron/ipc.service';
import { SharedModule } from '@shared/modules/shared.module';
import { ConnectionService } from '@shared/services/connection.service';
import { IconsService } from '@shared/services/icons.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private iconsService = inject(IconsService);
  private ipcService = inject(IpcService);
  public readonly icons = this.iconsService.getIcons;
  public connectionService = inject(ConnectionService);
  public isExpanded = false;

  constructor(private router: Router) {}

  public expandScreen() {
    const width = this.isExpanded ? 400 : 800;
    const height = 600;

    this.ipcService.resizeWindow(width, height, true);
    this.isExpanded = !this.isExpanded;
    const mainElement = document.querySelector('main');
    if (mainElement) {
      if (this.isExpanded) {
        mainElement.classList.add('expanded');
      } else {
        mainElement.classList.remove('expanded');
      }
    }
  }
}
