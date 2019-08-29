import { Action } from '@ngrx/store';
import { Vote } from './vote.model';

export enum VoteActionTypes {
  UPSERT_ONE = '[vote] Upsert_one',
  UPSERT_ALL_FromFirebase = '[vote] Upsert_all_FromFirebase',
  UPSERT_ALL = '[vote] Upsert_all_votes_FromFirebase',
  UPSERT_ALL2 = '[vote] Upsert_all',
  UPDATE = '[vote] Update',
  RESET = '[vote] Reset',
  DELETE_ONE = '[vote] Delete_one_carte',
  VoteForId = '[vote] new_Vote'
}


export class ActionVoteForId implements Action {
  readonly type = VoteActionTypes.VoteForId;
  constructor(readonly payload: { id: any, isAuth:any }) {}
}


export class ActionVoteUpsertAll implements Action {
  readonly type = VoteActionTypes.UPSERT_ALL;
  constructor(readonly payload: { votes: any }) {}
}

export class ActionVoteUpsertAll2 implements Action {
  readonly type = VoteActionTypes.UPSERT_ALL2;
  constructor(readonly payload: { votes: any }) {}
}

export class ActionVoteUpsertAllFromFirebase implements Action {
  readonly type = VoteActionTypes.UPSERT_ALL_FromFirebase;
  constructor(readonly payload: { votes: any }) {}
}

export class ActionVoteUpsertOne implements Action {
  readonly type = VoteActionTypes.UPSERT_ONE;
  constructor(readonly payload: { vote: Vote }) {}
}

export class ActionVoteDeleteOne implements Action {
  readonly type = VoteActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: string }) {}
}

export class ActionVoteUpdate implements Action {
  readonly type = VoteActionTypes.UPDATE;
  constructor(readonly payload: { vote: Vote }) {}
}

export class ActionVoteReset implements Action {
  readonly type = VoteActionTypes.RESET;
}




export type VoteActions =
  | ActionVoteUpdate
  | ActionVoteReset
  | ActionVoteUpsertOne
  | ActionVoteDeleteOne
  | ActionVoteUpsertAll
  | ActionVoteUpsertAllFromFirebase
  | ActionVoteUpsertAll2
  | ActionVoteForId;
