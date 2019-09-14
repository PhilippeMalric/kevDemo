import { Action } from '@ngrx/store';
import { UserState, User } from './users.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UsersActionTypes, UsersActions } from './users.actions';

export function sortByTitle(a: User, b: User): number {
  return a.name.localeCompare(b.name);
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  sortComparer: sortByTitle
});


export const initialState: UserState = {

  ids:[],
  entities:{ }
}


export function userReducer(state = initialState, action: UsersActions): UserState {
  switch (action.type) {

    case UsersActionTypes.SaveUsers:
      return userAdapter.upsertMany(action.payload.users, state);


    default:
      return state;
  }
}
