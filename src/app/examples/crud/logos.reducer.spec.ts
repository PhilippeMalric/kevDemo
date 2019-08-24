import { LogoState } from './logos.model';
import { logoReducer, initialState } from './logos.reducer';
import { ActionLogosUpsertOne, ActionLogosDeleteOne } from './logos.actions';

describe('BookReducer', () => {
  const TEST_INITIAL_STATE: LogoState = {
    ids: ['123'],
    entities: {
      '123': {
        id: '123',
        url_img: 'Reactive Programming with Angular and ngrx',
        texte: '',
        niveauDaccord: 1,
        commentaire:
          'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      }
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = logoReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a book', () => {
    const action = new ActionLogosUpsertOne({
      logo: {
        id: '123',
        url_img: 'Reactive Programming with Angular and ngrx',
        texte: '',
        niveauDaccord: 1,
        commentaire:
          'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      }
    });
    const state = logoReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234'].commentaire).toEqual('test');
  });

  it('should update a book', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionLogosUpsertOne({
      logo: {
        id: '123',
        url_img: 'Reactive Programming with Angular and ngrx',
        texte: '',
        niveauDaccord: 1,
        commentaire:
          'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      }
    });

    const state = logoReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        title: 'updated',
        author: 'updated',
        description: 'updated'
      })
    );
  });

  it('should remove a book', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionLogosDeleteOne({ id });
    const state = logoReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });
});
