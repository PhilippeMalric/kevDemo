import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectName = createSelector(
  selectAuthState,
  (state: AuthState) => state.displayName
);

export const selectEmail = createSelector(
  selectAuthState,
  (state: AuthState) => state.email
);

export const selectDisplayName = createSelector(
  selectAuthState,
  (state: AuthState) => state.displayName
);
