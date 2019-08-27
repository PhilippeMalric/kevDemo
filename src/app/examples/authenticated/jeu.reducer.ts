import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { FormState, Form } from './form.model';
import { FormActions, FormActionTypes } from './form.actions';
import { Jeu, JeuState, Carte } from './jeu.model';
import { JeuActions, JeuActionTypes } from './jeu.actions';

export function sortByEtat(a: Jeu, b: Jeu): number {
  return a.etat.localeCompare(b.etat);
}

export const jeuAdapter: EntityAdapter<Jeu> = createEntityAdapter<Jeu>({
  sortComparer: sortByEtat
});

export const initialState: JeuState = jeuAdapter.getInitialState({
  ids: [],
  entities: {
    test: {
      etat: 'test',
      tour: '1',
      cartes: []
    }
  }
});

export function jeuReducer(
  state: JeuState = initialState,
  action: JeuActions
): JeuState {
  switch (action.type) {
    case JeuActionTypes.UPSERT_ONE_CARTE:
      console.log('state');
      console.log(state);

      console.log('entities');

      console.log(state.entities);
      /*
      let cartes = JSON.parse(JSON.stringify(state.entities["test"].cartes))
      cartes.push(action.payload.carte)

     */
      let jeu = {
        id: 'test2',
        cartes: [],
        etat: 'test',
        tour: '1'
      };
      return jeuAdapter.upsertOne(jeu, state);

    case JeuActionTypes.UPSERT_ALL_CARTE_FromFirebase:
      let cartes2 = JSON.parse(JSON.stringify(action.payload));

      console.log('cartes2');
      console.log(cartes2);

      let jeu3 = {
        id: 'test',
        cartes: cartes2,
        etat: 'test',
        tour: '1'
      };
      jeuAdapter.upsertOne(jeu3, state);

    case JeuActionTypes.UPSERT_ALL_CARTE:
      let cartes = JSON.parse(JSON.stringify(state.entities['test'].cartes));
      cartes.push(JSON.parse(JSON.stringify(action.payload.carte)));

      let jeu2 = {
        id: 'test',
        cartes: cartes,
        etat: 'test',
        tour: '1'
      };

      return jeuAdapter.upsertOne(jeu2, state);

    case JeuActionTypes.UPSERT_ONE:
      return jeuAdapter.upsertOne(action.payload.jeu, state);

    case JeuActionTypes.DELETE_ONE:
      return jeuAdapter.removeOne(action.payload.id, state);

    case JeuActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}
