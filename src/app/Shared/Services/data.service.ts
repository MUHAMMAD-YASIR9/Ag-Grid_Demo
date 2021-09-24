import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private toggleDarkMode = new BehaviorSubject<any>('');
  checkToggleDarkMode = this.toggleDarkMode.asObservable();
  constructor() { }
  castToggleMode(val:any) {
    this.toggleDarkMode.next(val);
  }
}
