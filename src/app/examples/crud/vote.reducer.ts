import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { VoteActions, VoteActionTypes } from './vote.actions';
import { Vote, VoteState } from './vote.model';

export function sortByEtat(a: Vote, b: Vote): number {
  return a.nom.localeCompare(b.nom);
}

export const voteAdapter: EntityAdapter<Vote> = createEntityAdapter<Vote>({
  sortComparer: sortByEtat
});

export const initialState: VoteState = voteAdapter.getInitialState({
  ids: [],
  entities: {}
});

export function voteReducer(
  state: VoteState = initialState,
  action: VoteActions
): VoteState {
  switch (action.type) {
    case VoteActionTypes.UPSERT_ONE:
      console.log('action.payload.vote');
      console.log(action.payload.vote);
      return voteAdapter.upsertOne(action.payload.vote, state);

    case VoteActionTypes.UPSERT_ALL_FromFirebase:
      voteAdapter.upsertMany(action.payload.votes, state);

    case VoteActionTypes.UPSERT_ALL:
      return voteAdapter.upsertOne(action.payload.votes, state);

    case VoteActionTypes.UPSERT_ONE:
      return voteAdapter.upsertOne(action.payload.vote, state);

    case VoteActionTypes.DELETE_ONE:
      return voteAdapter.removeOne(action.payload.id, state);

    case VoteActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}
