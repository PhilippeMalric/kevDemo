import {
  LogoActionTypes,
  ActionLogosUpsertOne,
  ActionLogosDeleteOne
} from './logos.actions';

describe('Books Actions', () => {
  it('should create ActionBooksUpsertOne action', () => {
    const action = new ActionLogosUpsertOne({
      logo: {
        id: '1',
        texte: 'test',
        commentaire: 'test',
        niveauDaccord: 1,
        url_img: ''
      }
    });
    expect(action.type).toEqual(LogoActionTypes.UPSERT_ONE);
    expect(action.payload.logo).toEqual(
      jasmine.objectContaining({
        id: '1',
        texte: 'test',
        commentaire: 'test',
        niveauDaccord: 1,
        url_img: ''
      })
    );
  });

  it('should create ActionBooksDeleteOne action', () => {
    const action = new ActionLogosDeleteOne({ id: '1' });
    expect(action.type).toEqual(LogoActionTypes.DELETE_ONE);
    expect(action.payload.id).toEqual('1');
  });
});
