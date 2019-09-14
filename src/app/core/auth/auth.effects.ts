import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, catchError, take } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  GET_USER,
  GetUser,
  Authenticated,
  NotAuthenticated,
  AuthError,
  GOOGLE_LOGIN,
  GoogleLogin,
  LOGOUT,
  Logout,
  AUTHENTICATED
} from './auth.actions';
import { GoogleAuthService } from './google-auth.service';
import { Observable, of, from } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataService } from '@app/examples/gears/data.service';
import { Logos_KEY, DICT_uID_FB } from '@app/examples/crud/logos.effects';
import { State } from '@app/examples/examples.state';

export const AUTH_KEY = 'AUTH';
@Injectable()
export class AuthEffects {
  constructor(
    private store: Store<State>,
    private dataS: DataService,
    private googleAuth: GoogleAuthService,
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private afs: AngularFirestore
  ) {}

  @Effect({ dispatch: false })
  getUser: Observable<any> = this.actions$.pipe(
    ofType(AUTHENTICATED),

    map((action: Authenticated) => action.payload),
    map((authData: any) => {
      if (authData) {
        /// User logged in
        this.afs
          .collection('logos')
          .doc(DICT_uID_FB)
          .valueChanges()
          .subscribe((values: any) => {
            //console.log('values');
            //console.log(values);
            if (authData.uid in values) {
              let id = values[authData.uid];
              //Logos_KEY
              //this.dataS.logoKey.next(id);
            } else {
              this.store.pipe(take(1)).subscribe(store => {
                console.log('store');
                console.log(store);
                let newStore = JSON.parse(JSON.stringify(store));
                newStore.examples.logos = { ids: [], entities: {} };
                let ref = this.afs
                  .collection('logos')
                  .ref.add(newStore)
                  .then(res => {
                    let id = res.id;
                    let newObj = values;
                    newObj[authData.uid] = id;
                    this.afs
                      .collection('logos')
                      .doc(DICT_uID_FB)
                      .update(newObj)
                      .then(() => {
                        console.log(id)
                        //this.dataS.logoKey.next(id);
                      });
                  });
              });
            }
          });
        const user = new User(
          authData.uid,
          authData.displayName,
          authData.email
        );
      } else {
        console.log('not auth');
      }
    })
  );

  @Effect({ dispatch: false })
  login: Observable<Action> = this.actions$.pipe(
    ofType(GOOGLE_LOGIN),

    map((action: GoogleLogin) => action.payload),
    tap(payload => {
      return this.googleAuth.googleSignIn();
    }),
    catchError(err => {
      return of(new AuthError({ error: err.message }));
    })
  );

  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType(LOGOUT),

    map((action: Logout) => action.payload),
    switchMap(payload => {
      this.dataS.logoKey.next(Logos_KEY);
      return this.googleAuth.logout();
    }),
    map(authData => {
      return new NotAuthenticated();
    }),
    catchError(err => of(new AuthError({ error: err.message })))
  );
}
