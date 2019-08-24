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
    case LogoActionTypes.UPSERT_ONE:
      return logoAdapter.upsertOne(action.payload.logo, state);

    case LogoActionTypes.UPSERT_ALL:
      return logoAdapter.upsertMany(action.payload.logos, state);

    case LogoActionTypes.UPSERT_ALL2:
      return logoAdapter.upsertMany(action.payload.logos, state);

    case LogoActionTypes.DELETE_ONE:
      return logoAdapter.removeOne(action.payload.id, state);

    case LogoActionTypes.CHANGE_NIVEAU:
      let logoState: LogoState = JSON.parse(JSON.stringify(state));
      console.log(logoState.entities);
      console.log(action.payload.id);
      logoState.entities[action.payload.id].niveauDaccord += 1;
      return logoState;
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
