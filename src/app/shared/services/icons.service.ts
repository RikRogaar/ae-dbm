import { Injectable } from '@angular/core';
import { FontAwesomeIcons } from './font-awesome-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  get getIcons() {
    return FontAwesomeIcons;
  }
}
