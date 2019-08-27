import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '@app/core';

import { State } from '../examples.state';
import { TodosActionTypes } from './todos.actions';
import { JeuActionTypes } from './jeu.actions';
import { selectJeuTour } from './jeu.selectors';
import { Carte, JeuState } from './jeu.model';
import { JeuServiceService } from './jeu-service.service';

export const TODOS_KEY = 'EXAMPLES.TODOS';

@Injectable()
export class JeuxEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    public jeuServiceService: JeuServiceService,
    private jeuStore: Store<JeuState>
  ) {}

  @Effect({ dispatch: false })
  persistTodos = this.actions$.pipe(
    ofType(JeuActionTypes.RESET),
    withLatestFrom(this.store.pipe(select(selectJeuTour))),
    tap(([action, tour]) => this.localStorageService.setItem(TODOS_KEY, tour))
  );

  @Effect({ dispatch: false })
  addCarteToFirebase = this.actions$.pipe(
    ofType(JeuActionTypes.UPSERT_ALL_CARTE),
    withLatestFrom(this.store),
    tap(
      ([data, store]) => {
        console.log('data to firebase!!');
        console.log(data);
        console.log(store);

        this.jeuServiceService.addCartesToFirebase(store);
      }
      //selectAllJeu
    )
  );
}
