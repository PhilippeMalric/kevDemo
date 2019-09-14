import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/core';

import { jeuReducer } from './authenticated/jeu.reducer';
import { Jeu, JeuState } from './authenticated/jeu.model';
import { logoReducer } from './crud/logos.reducer';
import { LogoState } from './crud/logos.model';
import { voteReducer } from './crud/vote.reducer';
import { VoteState } from './crud/vote.model';
import { UserState } from './users-info/users.model';
import { userReducer } from './users-info/users.reducer';

export const FEATURE_NAME = 'examples';

export const selectExamples = createFeatureSelector<State, ExamplesState>(
  FEATURE_NAME
);

export const reducers: ActionReducerMap<ExamplesState> = {
  jeux: jeuReducer,
  logos: logoReducer,
  votes: voteReducer,
  users: userReducer
};

export interface ExamplesState {
  jeux: JeuState;
  logos: LogoState;
  votes: VoteState;
  users: UserState;
}

export interface State extends AppState {
  examples: ExamplesState;
}
