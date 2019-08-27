import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { JeuState, Carte } from './jeu.model';
import { ActionJeuUpsertOneCarte } from './jeu.actions';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { tap, map } from 'rxjs/operators';
import { selectJeuxState } from './jeu.selectors';

@Injectable({
  providedIn: 'root'
})
export class JeuServiceService {
  basePath = '/cartes';
  cartes: Carte[];

  constructor(public store: Store<JeuState>, private af: AngularFirestore) {}

  click() {
    this.store.dispatch(
      new ActionJeuUpsertOneCarte({
        carte: { valeur: 1, couleur: 'carreau', noms: [] }
      })
    );
    //
  }
  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  };
  getCartesFromFirebase() {
    const collection: AngularFirestoreCollection<{
      carte: Carte;
      id: string;
    }> = this.af.collection('cartes');
    return collection.snapshotChanges().pipe(
      map(actions => actions.map(this.documentToDomainObject)),
      tap(data => {
        console.log(data);
      })
    );
  }

  modifyCartesToFirebase(id, carte: Carte) {
    const collection: AngularFirestoreCollection<Carte> = this.af.collection(
      'cartes'
    );
    collection.doc(id).update({ carte: carte });
  }

  deleteCartesToFirebase(id) {
    const collection: AngularFirestoreCollection<Carte> = this.af.collection(
      'cartes'
    );
    collection.doc(id).delete();
  }

  addCartesToFirebase(jeuState: any) {
    console.log('jeuState');
    console.log(jeuState);

    const collection: AngularFirestoreCollection<Carte> = this.af.collection(
      'cartes'
    );
    collection.doc('L4XBs3eB8e3FXYUbK75H').update(jeuState);
    //collection.add(carte)

    // Notice how the observable is separated from write options

    //const collection$: Observable<Item> = collection.valueChanges()
    //collection$.subscribe(data => console.log(data) )
  }
}
