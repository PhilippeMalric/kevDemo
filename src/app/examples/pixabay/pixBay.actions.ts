import { Action } from '@ngrx/store';
import { Pixbay } from './pixBay.model';

export enum PixBayActionTypes {
  UPSERT_ONE = '[pixBay] Upsert_one',
  UPSERT_ALL = '[pixBay] Upsert_all',
  UPDATE = '[pixBay] Update',
  RESET = '[pixBay] Reset',
  DELETE_ONE = '[pixBay] Delete_one_'
}



export class ActionPixbayUpsertAll implements Action {
  readonly type = PixBayActionTypes.UPSERT_ALL;
  constructor(readonly payload: { pixBays: any }) {}
}

export class ActionPixbayUpsertOne implements Action {
  readonly type = PixBayActionTypes.UPSERT_ONE;
  constructor(readonly payload: { pixBay: Pixbay }) {}
}

export class ActionPixbayDeleteOne implements Action {
  readonly type = PixBayActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: string }) {}
}

export class ActionPixbayUpdate implements Action {
  readonly type = PixBayActionTypes.UPDATE;
  constructor(readonly payload: { pixBay: Pixbay }) {}
}

export class ActionPixbayReset implements Action {
  readonly type = PixBayActionTypes.RESET;
}




export type PixbayActions =
  | ActionPixbayUpdate
  | ActionPixbayReset
  | ActionPixbayUpsertOne
  | ActionPixbayDeleteOne
  | ActionPixbayUpsertAll
