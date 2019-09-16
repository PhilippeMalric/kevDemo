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
      console.log("state")
      console.log(state)
      return voteAdapter.upsertOne(action.payload.vote, state);

    case VoteActionTypes.UPSERT_ALL_FromFirebase:

      return action.payload.votes;

    case VoteActionTypes.UPSERT_ALL:
        console.log("state")
        console.log(state)
        console.log('action.payload.votes');
        console.log(action.payload.votes);
        let votes: any = []
        if(Object.entries(action.payload).length === 0 && action.payload.constructor === Object  ){
          votes = action.payload.votes.ids.map((id)=>action.payload.votes.entities[id])
        }
      return voteAdapter.upsertMany(votes, state);

    case VoteActionTypes.UPSERT_ALL2:
      return voteAdapter.removeAll(state);


    case VoteActionTypes.UPSERT_ONE:
      return voteAdapter.upsertOne(action.payload.vote, state);

    case VoteActionTypes.DELETE_ONE:
      return voteAdapter.removeOne(action.payload.id, state);

    case VoteActionTypes.RESET:
      return initialState;

    case VoteActionTypes.VoteForId:
      console.log("action.payload.id VoteForId")
      console.log(action.payload.id)
      console.log("state")
      console.log(state)

    if(action.payload.isAuth)


      return state;


    default:
      return state;
  }
}
