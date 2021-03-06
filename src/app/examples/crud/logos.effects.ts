import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom, take, map } from 'rxjs/operators';

import { LocalStorageService, selectAuth } from '@app/core';

import { State } from '../examples.state';
import { LogoActionTypes } from './logos.actions';
import { selectLogos } from './logos.selectors';
import { selectName } from '../../core/auth/auth.selectors';
import { Logo, LogoState } from './logos.model';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { ActionVoteUpdate, ActionVoteCalculate } from './vote.actions';

export const Logos_KEY = '7CbwL8S27sEhVzM2ZIGw';
export const DICT_uID_FB = 'l69Lh0zQOfsY1Sh8fLbx';

@Injectable()
export class LogosEffects {
  constructor(
    private afs: AngularFirestore,
    private actions$: Actions<Action>,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  persistLogos = this.actions$.pipe(
    ofType(
      LogoActionTypes.SAVE,

    ),
    withLatestFrom(this.store),

    tap(([actions, store]) => {
      console.log('store111');
      console.log(store);
      console.log("actions['payload']['logo']");
      console.log(actions['payload']['logo']);

      this.afs
        .collection('logos')
        .doc(DICT_uID_FB)
        .valueChanges().pipe(take(1))
        .subscribe((values: any) => {
          //console.log('values');
          //console.log(values);

          //console.log('id1');
          //console.log(store.auth.uid);
          if (store.auth.uid && store.auth.uid in values) {
            let id = values[store.auth.uid];
            const collection: AngularFirestoreCollection<LogoState> = this.afs.collection('logos');

            let newStore = JSON.parse(JSON.stringify(store))

            newStore.examples.logos.entities[actions['payload']['logo']['id']] = actions['payload']['logo']
            collection.doc(Logos_KEY).update(newStore);
            //collection.doc(id).update(newStore);
          } else {
            //console.log('User not in index : ' + DICT_uID_FB);
            //console.log('Or not login');
            const collection: AngularFirestoreCollection<LogoState> = this.afs.collection('logos');
            //console.log('collection');

            let newStore = JSON.parse(JSON.stringify(store))

            newStore.examples.logos.entities[actions['payload']['logo']['id']] = actions['payload']['logo']

            //console.log(collection);
            collection.doc(Logos_KEY).update(newStore);
          }
        });
    })
  );

  @Effect({ dispatch: false })
  UpsertAllLogos = this.actions$.pipe(
    ofType(
      LogoActionTypes.DELETE_ONE,
      ),
      withLatestFrom(this.store),

      tap(([actions, store]) => {
      //console.log('store');
      //console.log(store);

      this.afs
        .collection('logos')
        .doc(DICT_uID_FB)
        .valueChanges()
        .subscribe((values: any) => {
          //console.log('values');
          //console.log(values);
          /*
          if (store.auth.uid in values) {
            let id = values[store.auth.uid];
            const collection: AngularFirestoreCollection<
              LogoState
            > = this.afs.collection('logos');
            collection.doc(id).update(store);
          } else {

            */
          console.log('store to firestore');
          console.log(store);
          let newStore = JSON.parse(JSON.stringify(store))
          const collection: AngularFirestoreCollection<LogoState> = this.afs.collection('logos');
          collection.doc(Logos_KEY).update(newStore);
          //console.log('User not in index : ' + DICT_uID_FB);
          //}
        });
    })
  );


@Effect({ dispatch: true })
upsertAll = this.actions$.pipe(
  ofType(
    LogoActionTypes.UPSERT_ALL
  ),
 map((action)=>{
   return new ActionVoteCalculate({})
 })

);
}
