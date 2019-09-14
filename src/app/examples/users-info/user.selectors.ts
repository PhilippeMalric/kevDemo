import { createSelector } from '@ngrx/store';

import { selectExamples, ExamplesState } from '../examples.state';

import { userAdapter } from './users.reducer';

const { selectEntities, selectAll } = userAdapter.getSelectors();

export const selectUsers = createSelector(
  selectExamples,
  (state: ExamplesState) => state.users
);

export const selectAllUsers = createSelector(selectUsers, selectAll);
export const selectUsersEntities = createSelector(selectUsers, selectEntities);

