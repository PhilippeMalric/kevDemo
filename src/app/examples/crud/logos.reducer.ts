import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Logo, LogoState } from './logos.model';
import { LogoActionTypes, LogoActions } from './logos.actions';

import { constatation } from '../../../assets/data/constatation';
import { select } from '@ngrx/store';
import { selectAuth } from '@app/core/auth/auth.selectors';

export function sortByTitle(a: Logo, b: Logo): number {
  return a.id.localeCompare(b.id);
}

export const logoAdapter: EntityAdapter<Logo> = createEntityAdapter<Logo>({
  sortComparer: sortByTitle
});

export const initialState: LogoState = logoAdapter.getInitialState({
  ids: [],
  entities: {}
});

export function logoReducer(
  state: LogoState = initialState,
  action: LogoActions
): LogoState {
  switch (action.type) {

    case LogoActionTypes.CHANGE_NIVEAU:
      console.log('CHANGE NIVEAU');
      console.log(action.payload["niveau"]);
      if(state){
        let newLogo:Logo = JSON.parse(JSON.stringify(state.entities[state.ids[action.payload["id"]]]))
        newLogo.niveauDaccord =   action.payload["niveau"]
        console.log("newLogo");
        console.log(newLogo);

        let state2 = logoAdapter.upsertOne(newLogo, state);
        //console.log("state2")
        //console.log(state2)
        return state2
      }
      else{
        return state
      }

      case LogoActionTypes.SAVE:
          //console.log('LogoUpserted');
          //console.log(action.payload.logo);
          return logoAdapter.upsertOne(action.payload.logo, state);

    case LogoActionTypes.UPSERT_ONE:
      //console.log('LogoUpserted');
      //console.log(action.payload.logo);
      return logoAdapter.upsertOne(action.payload.logo, state);

    case LogoActionTypes.UPSERT_ONE_Local:
      //console.log('LogoUpserted');
      //console.log(action.payload.logo);
      let newState = logoAdapter.upsertOne(action.payload.logo, state);
      //console.log('newState');
      //console.log(newState);
      return newState


    case LogoActionTypes.UPSERT_ALL:
      //console.log(action.payload.logos)
      return logoAdapter.upsertMany(action.payload.logos, state);

    case LogoActionTypes.UPSERT_ALL2:
      return logoAdapter.upsertMany(action.payload.logos, state);

    case LogoActionTypes.UpsertAllFromVote:
        return logoAdapter.upsertMany(action.payload.logos, state);

    /*
    case LogoActionTypes.WIN:
        console.log('CHANGE NIVEAU');
        console.log(action.payload["niveau"]);
        if(state){
          let newLogos:Logo[] = JSON.parse(JSON.stringify(action.payload.logos))
          console.log("newLogo win + 1");
          console.log(newLogos);

          let state2 = logoAdapter.upsertMany(newLogos, state);
          //console.log("state2")
          //console.log(state2)
          return state2
        }
        else{
          return state
        }
*/
    case LogoActionTypes.DELETE_ONE:
      return logoAdapter.removeOne(action.payload.id, state);

    /*
        let votes = action.payload.book.votes.slice(0);
        let votes2 = votes.filter(v=>v.nom != action.payload.vote.nom)

        votes2.push(action.payload.vote)

        console.log("book")
        console.log(action.payload.book)
        let oldbook = action.payload.book
        return bookAdapter.upsertOne({...oldbook,votes:votes2}, state);
*/
    default:
      return state;
  }
}
