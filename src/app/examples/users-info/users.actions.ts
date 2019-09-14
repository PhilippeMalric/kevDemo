import { Action } from '@ngrx/store';
import { User } from './users.model';

export enum UsersActionTypes {
  LoadUsers = '[Users] Load Users',
  SaveUsers = '[Users] save Users',

}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
  constructor(readonly payload: { users:User[] }) {}
}
export class SaveUsers implements Action {
  readonly type = UsersActionTypes.SaveUsers;
  constructor(readonly payload: { users:User[] }) {}
}

export type UsersActions = LoadUsers | SaveUsers;
