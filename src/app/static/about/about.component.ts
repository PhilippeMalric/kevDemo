import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS, selectEmail, selectDisplayName } from '@app/core';
import { select, Store } from '@ngrx/store';
import { State } from '@app/examples/examples.state';
import { take } from 'rxjs/operators';


@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  authName$: any;
  authName: any;
  constructor(private store: Store<State>) {
    this.authName$ = this.store.pipe(select(selectDisplayName));
    this.authName$.pipe(take(1)).subscribe(user => {
      this.authName = user;
      console.log('authName');
      console.log(user);
    });

  }

  ngOnInit() {


  }
}
