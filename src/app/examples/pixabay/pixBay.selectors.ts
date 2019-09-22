import { createSelector } from '@ngrx/store';
import { jeuAdapter } from './jeu.reducer';

import { ExamplesState, selectExamples } from '../examples.state';

const { selectEntities, selectAll } = jeuAdapter.getSelectors();

export const selectJeux = createSelector(
  selectExamples,
  (state: ExamplesState) => state.votes
);

export const selectAllVote = createSelector(selectJeux, selectAll);

export const selectJeuxState = createSelector(
  selectExamples,
  (state: ExamplesState) => state.jeux
);

export const selectJeuTour = createSelector(
  selectJeuxState,
  state => state.entities
);

export const selectJeuxEtat = createSelector(
  selectJeuxState,
  state => state.entities
);

export const selectTourEtat = createSelector(
  selectJeuTour,
  selectJeuxEtat,
  (tour, etat) => {
    return etat;
  }
);
