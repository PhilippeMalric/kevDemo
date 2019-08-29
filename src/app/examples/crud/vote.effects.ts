import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom, map, catchError } from 'rxjs/operators';

import { LocalStorageService, AuthError } from '@app/core';

import { State } from '../examples.state';
import { VoteService } from './vote.service';
import { VoteState, Vote } from './vote.model';
import { VoteActionTypes } from './vote.actions';
import { of } from 'rxjs';
import { ActionLogosUpsertOne, ActionLogosUpsertAll } from './logos.actions';
import { Logo } from './logos.model';

export const TODOS_KEY = 'EXAMPLES.TODOS';

@Injectable()
export class VotesEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    public voteService: VoteService,
    private jeuStore: Store<VoteState>
  ) {}

  @Effect({ dispatch: false })
  persistTodos = this.actions$.pipe(
    ofType(VoteActionTypes.RESET),
    tap(action => this.localStorageService.setItem(TODOS_KEY, ''))
  );

  @Effect({ dispatch: false })
  addCarteToFirebase = this.actions$.pipe(
    ofType(VoteActionTypes.UPSERT_ONE),
    withLatestFrom(this.store),
    tap(
      ([data, store]) => {
        console.log('data to firebase!!');
        console.log('data');
        console.log(data);

        console.log('store');
        console.log(store);
        console.log('votes');
        console.log(store.examples.votes);

        this.voteService.addVoteToFirebase(store.examples.votes);
      }
      //selectAllJeu
    )
  );

  @Effect()
  calculAvg = this.actions$.pipe(
    ofType(VoteActionTypes.UPSERT_ONE),
    withLatestFrom(this.store),
    map(([data, store]) => {
      console.log('data to firebase!!');
      console.log('data2');
      console.log(data);

      console.log('store2');
      console.log(store);

      let tabNiveau = [];

      let logos2 = JSON.parse(JSON.stringify(store.examples.logos));
      let votes2 = JSON.parse(JSON.stringify(store.examples.votes));
      logos2.entities[
        data['payload']['vote']['logo']
      ].niveauDaccord = data['payload']['vote']['niveauDaccord'];

      logos2.entities[
        data['payload']['vote']['logo']
      ].commentaire =  data['payload']['vote']['commentaire'];

      let logId =
      logos2.entities[data['payload']['vote']['logo']].id;
      console.log('logId');
      console.log(logId);
      for (let id of votes2.ids) {
        let logIdTemp = votes2.entities[id].logo;
        console.log('loglogIdTempId');
        console.log(logIdTemp);
        if (logIdTemp == logId) {
          let vote = votes2.entities[id];
          console.log(vote);
          tabNiveau.push(vote.niveauDaccord);
        }
      }
      let avg = this.getAvg(tabNiveau);
      console.log('avg');
      console.log(avg);
      logos2.entities[data['payload']['vote']['logo']].avg = avg;

      let newLogo: { logo: Logo } = {
        logo: logos2.entities[data['payload']['vote']['logo']]
      };

      console.log('newLogo');
      console.log(newLogo);

      return new ActionLogosUpsertOne(newLogo);
    })
  );

  @Effect({ dispatch: false })
  addVotesToFirebase = this.actions$.pipe(
    ofType(VoteActionTypes.UPSERT_ONE),
    withLatestFrom(this.store),
    tap(
      ([data, store]) => {
        console.log('data to firebase!!');
        console.log('data');
        console.log(data);

        console.log('store');
        console.log(store);
        console.log('votes');
        console.log(store.examples.votes);

        this.voteService.addVoteToFirebase(store.examples.votes);
      }
      //selectAllJeu
    )
  );


  @Effect({ dispatch: false })
  addVotesAll = this.actions$.pipe(
    ofType(VoteActionTypes.UPSERT_ALL2),
    withLatestFrom(this.store),
    map(
      ([data, store]) => {
        console.log('data to firebase!!');
        console.log('data');
        console.log(data);

        console.log('store');
        console.log(store);
        console.log('votes');
        console.log(store.examples.votes);

        this.voteService.addVoteToFirebase(store.examples.votes);

        let newLogos:any = JSON.parse(JSON.stringify (store.examples.logos))

        newLogos.ids.map((ids)=>{
          newLogos.entities[ids].avg = 0
          newLogos.entities[ids].niveauDaccord = 0
        })

        return new ActionLogosUpsertAll({logos:newLogos});
      }
      //selectAllJeu
    )
  );

  getNiveau = (id: any, store) => {
    return store.examples.votes.entities[id].niveauDaccord;
  };

  getAvg(tab: number[]) {
    let total = 0;
    for (let n of tab) {
      console.log(n);
      total += n;
    }
    return (total / tab.length);//Math.floor
  }
}
