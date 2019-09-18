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
import { ActionLogosUpsertOne, ActionLogosUpsertAll, ActionLogosUpsertOneLocal, ActionLogosUpsertAllFromVote } from './logos.actions';
import { Logo } from './logos.model';

export const vote_key = "6x9IhcIg7bfpiKquRW7A"
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
    ofType(VoteActionTypes.UPSERT_ALL),
    withLatestFrom(this.store),
    map(([data, store]) => {
      console.log('data UPSERT_ALL');
      console.log(data);

      console.log('store UPSERT_ALL');
      console.log(store);



      let logos2 = JSON.parse(JSON.stringify(store.examples.logos));
      let votes2 = JSON.parse(JSON.stringify(store.examples.votes));

      let avgDict = {}

      for(let logIdTemp of logos2.ids){
        let tabNiveau = [];
        for (let voteId of votes2.ids) {

          console.log('loglogIdTempId');
          console.log(logIdTemp);
          console.log('votes2.entities[voteId].logo');
          console.log(votes2.entities[voteId].logo);
          if (logIdTemp == votes2.entities[voteId].logo) {
            let vote = votes2.entities[voteId];
            console.log(vote);
            tabNiveau.push(vote.niveauDaccord);
          }
        }
        avgDict[logIdTemp] = this.getAvg(tabNiveau);
        logos2.entities[logIdTemp].avg = avgDict[logIdTemp]

      }

      let newLogos: { logos: Logo[] } = {
        logos: logos2.ids.map((id)=>logos2.entities[id])
      };

      console.log('newLogos');
      console.log(newLogos);

      return new ActionLogosUpsertAllFromVote(newLogos)

    })
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


  @Effect({ dispatch: true })
  addVotesAll2 = this.actions$.pipe(
    ofType(VoteActionTypes.Calculate),
    withLatestFrom(this.store),
    map(([data, store]) => {
      console.log('data UPSERT_ALL');
      console.log(data);

      console.log('store UPSERT_ALL');
      console.log(store);



      let logos2 = JSON.parse(JSON.stringify(store.examples.logos));
      let votes2 = JSON.parse(JSON.stringify(store.examples.votes));

      let avgDict = {}

      for(let logIdTemp of logos2.ids){
        let tabNiveau = [];
        for (let voteId of votes2.ids) {

          console.log('loglogIdTempId');
          console.log(logIdTemp);
          console.log('votes2.entities[voteId].logo');
          console.log(votes2.entities[voteId].logo);
          if (logIdTemp == votes2.entities[voteId].logo) {
            let vote = votes2.entities[voteId];
            console.log(vote);
            tabNiveau.push(vote.niveauDaccord);
          }
        }
        avgDict[logIdTemp] = this.getAvg(tabNiveau);
        logos2.entities[logIdTemp].avg = avgDict[logIdTemp]

      }

      let newLogos: { logos: Logo[] } = {
        logos: logos2.ids.map((id)=>logos2.entities[id])
      };

      console.log('newLogos');
      console.log(newLogos);

      return new ActionLogosUpsertAllFromVote(newLogos)

    })
  )

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
