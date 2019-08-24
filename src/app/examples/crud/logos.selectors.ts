import { createSelector } from '@ngrx/store';

import { selectRouterState } from '@app/core';

import { selectExamples, ExamplesState } from '../examples.state';

import { logoAdapter } from './logos.reducer';

const { selectEntities, selectAll } = logoAdapter.getSelectors();

export const selectLogos = createSelector(
  selectExamples,
  (state: ExamplesState) => state.logos
);

export const selectAllLogos = createSelector(selectLogos, selectAll);
export const selectLogosEntities = createSelector(selectLogos, selectEntities);

export const selectSelectedLogos = createSelector(
  selectLogosEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);
