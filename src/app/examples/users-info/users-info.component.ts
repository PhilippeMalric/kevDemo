import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
