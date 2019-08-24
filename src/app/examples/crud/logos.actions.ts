import { Action } from '@ngrx/store';
import { Logo, Vote } from './logos.model';

export enum LogoActionTypes {
  UPSERT_ONE = '[logos] Upsert One',
  UPSERT_ALL = '[logos] Upsert All',
  UPSERT_ALL2 = '[logos] Upsert All 2',
  DELETE_ONE = '[logos] Delete One',
  CHANGE_NIVEAU = '[logos] Change_niveau'
}

export class ActionLogosUpsertOne implements Action {
  readonly type = LogoActionTypes.UPSERT_ONE;
  constructor(readonly payload: { logo: Logo }) {}
}

export class ActionLogosUpsertAll implements Action {
  readonly type = LogoActionTypes.UPSERT_ALL;
  constructor(readonly payload: { logos: Logo[] }) {}
}

export class ActionLogosUpsertAll2 implements Action {
  readonly type = LogoActionTypes.UPSERT_ALL2;
  constructor(readonly payload: { logos: Logo[] }) {}
}

export class ActionLogosDeleteOne implements Action {
  readonly type = LogoActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: string }) {}
}

export class ActionLogosLikeOne implements Action {
  readonly type = LogoActionTypes.CHANGE_NIVEAU;
  constructor(readonly payload: { id: string }) {}
}

export type LogoActions =
  | ActionLogosUpsertOne
  | ActionLogosUpsertAll
  | ActionLogosDeleteOne
  | ActionLogosLikeOne
  | ActionLogosUpsertAll2;
