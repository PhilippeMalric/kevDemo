import { Action } from '@ngrx/store';
import { Logo } from './logos.model';

export enum LogoActionTypes {
  UPSERT_ONE = '[logos] Upsert One',
  UPSERT_ONE_Local = '[logos] Upsert One Local',
  UPSERT_ALL = '[logos] Upsert All',
  UPSERT_ALL2 = '[logos] Upsert All 2',
  DELETE_ONE = '[logos] Delete One',
  CHANGE_NIVEAU = '[logos] Change_niveau',
  UpsertAllFromVote = '[logos] Upsert All from vote',
  SAVE = '[logos] SAVE ONE',
  WIN = '[logos] WIN',

}

export class ActionLogosUpsertOne implements Action {
  readonly type = LogoActionTypes.UPSERT_ONE;
  constructor(readonly payload: { logo: Logo }) {}
}

export class ActionLogosUpsertOneLocal implements Action {
  readonly type = LogoActionTypes.UPSERT_ONE_Local;
  constructor(readonly payload: { logo: Logo }) {}
}

export class ActionLogosUpsertAll implements Action {
  readonly type = LogoActionTypes.UPSERT_ALL;
  constructor(readonly payload: { logos: Logo[] }) {}
}

export class ActionLogosChangeONENiveau implements Action {
  readonly type = LogoActionTypes.CHANGE_NIVEAU;
  constructor(readonly payload: { niveau: any,id:any }) {}
}


export class ActionLogosUpsertAll2 implements Action {
  readonly type = LogoActionTypes.UPSERT_ALL2;
  constructor(readonly payload: { logos: Logo[] }) {}
}

export class ActionLogosDeleteOne implements Action {
  readonly type = LogoActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: any }) {}
}

export class ActionLogosLikeOne implements Action {
  readonly type = LogoActionTypes.CHANGE_NIVEAU;
  constructor(readonly payload: { id: any }) {}
}

export class ActionLogosUpsertAllFromVote implements Action {
  readonly type = LogoActionTypes.UpsertAllFromVote;
  constructor(readonly payload: { logos: Logo[] }) {}
}

export class ActionLogosSaveONE implements Action {
  readonly type = LogoActionTypes.SAVE;
  constructor(readonly payload: { logo: Logo }) {}
}

export class ActionLogosAddWin implements Action {
  readonly type = LogoActionTypes.WIN;
  constructor(readonly payload: { logos: Logo[] }) {}
}





export type LogoActions =
  | ActionLogosUpsertOne
  | ActionLogosUpsertAll
  | ActionLogosDeleteOne
  | ActionLogosLikeOne
  | ActionLogosUpsertAll2
  | ActionLogosUpsertOneLocal
  | ActionLogosChangeONENiveau
  | ActionLogosUpsertAllFromVote
  | ActionLogosSaveONE
  | ActionLogosAddWin;
