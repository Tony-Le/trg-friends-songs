import { Component, OnInit } from '@angular/core';
import { UserAlertService } from './user-alert.service';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.css']
})
export class UserAlertComponent implements OnInit {

  constructor(public userAlertService: UserAlertService) { }

  ngOnInit(): void {
  }

}
