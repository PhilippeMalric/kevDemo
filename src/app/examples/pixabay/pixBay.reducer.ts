import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Vote, VoteState } from './vote.model';
import { Pixbay, PixbayState } from './pixBay.model';
import { PixbayActions, PixBayActionTypes } from './pixBay.actions';

export function sortByEtat(a: Pixbay, b: Pixbay): number {
  return a.fromText.localeCompare(b.fromText);
}

export const pixbayAdapter: EntityAdapter<Pixbay> = createEntityAdapter<Pixbay>({
  sortComparer: sortByEtat
});

export const initialState: PixbayState = pixbayAdapter.getInitialState({
  ids: [],
  entities: {}
});

export function pixbayReducer(
  state: PixbayState = initialState,
  action: PixbayActions
): PixbayState {
  switch (action.type) {
    case PixBayActionTypes.UPSERT_ONE:
      console.log('action.payload.vote');
      console.log(action.payload.pixBay);
      console.log("state")
      console.log(state)
      return pixbayAdapter.upsertOne(action.payload.pixBay, state);


    case PixBayActionTypes.UPSERT_ALL:
        console.log("state")
        console.log(state)
        console.log('action.payload.');
        console.log(action.payload.pixBays);
        let pixBays: any = []

        pixBays = action.payload.pixBays.ids.map((id)=>action.payload.pixBays.entities[id])

      return pixbayAdapter.upsertMany(pixBays, state);

    case PixBayActionTypes.UPSERT_ALL:
      return pixbayAdapter.removeAll(state);


    case PixBayActionTypes.UPSERT_ONE:
      return pixbayAdapter.upsertOne(action.payload.pixBay, state);

    case PixBayActionTypes.DELETE_ONE:
      return pixbayAdapter.removeOne(action.payload.id, state);

    case PixBayActionTypes.RESET:
      return initialState;



    default:
      return state;
  }
}
