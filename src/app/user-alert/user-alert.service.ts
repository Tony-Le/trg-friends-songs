import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAlertService {
  alert: string;

  constructor() { }

  write(alert: string): void {
    this.alert = alert;
  }

  clear(): void {
    this.alert = '';
  }

}
