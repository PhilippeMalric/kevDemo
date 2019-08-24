import { v4 as uuid } from 'uuid';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Input
} from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS, selectName, AppState } from '@app/core';

import { State } from '../../examples/examples.state';
import { Logo, Vote } from '../../examples/crud/books.model';
import { ActionBooksUpsertAll } from '../../examples/crud/books.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap, take } from 'rxjs/operators';
import { BOOKS_KEY } from '../../examples/crud/books.effects';
import { DataService } from '@app/examples/gears/data.service';
import { Node } from '@app/examples/d3';
import { selectAllBooks } from '../crud/books.selectors';

@Component({
  selector: 'anms-gears',
  templateUrl: './gears.component.html',
  styleUrls: ['./gears.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearsComponent implements OnInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store2: Store<AppState>,
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {}
}
