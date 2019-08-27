import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { VoteState } from './vote.model';
import { ActionVoteUpsertOne } from './vote.actions';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { tap, map } from 'rxjs/operators';
import { selectJeuxState } from './vote.selectors';
import { Vote } from './vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  cartes: Vote[];

  constructor(public store: Store<VoteState>, private af: AngularFirestore) {}

  click() {
    this.store.dispatch(
      new ActionVoteUpsertOne({
        vote: {
          id: 'test',
          commentaire: '',
          niveauDaccord: 0,
          nom: '',
          logo: 'testClick'
        }
      })
    );
    //
  }
  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  };
  getVotesFromFirebase() {
    const collection: AngularFirestoreCollection<{
      carte: Vote;
      id: string;
    }> = this.af.collection('votes');
    return collection.snapshotChanges().pipe(
      map(actions => actions.map(this.documentToDomainObject)),
      tap(data => {
        //console.log(data);
      })
    );
  }

  /*
modifyCartesToFirebase(id,carte:Votes){

  const collection: AngularFirestoreCollection<Carte> = this.af.collection('cartes')
  collection.doc(id).update({carte:carte})

}
*/

  deleteVoteToFirebase(id) {
    const collection: AngularFirestoreCollection<Vote> = this.af.collection(
      'cartes'
    );
    collection.doc(id).delete();
  }

  addVoteToFirebase(votes) {
    //console.log('votes');
    //console.log(votes);

    const collection: AngularFirestoreCollection<Vote> = this.af.collection(
      'votes'
    );
    collection.doc('rUsx9vFEVq4il8FWX1w0').update(votes);

    //collection.add(carte)

    // Notice how the observable is separated from write options

    //const collection$: Observable<Item> = collection.valueChanges()
    //collection$.subscribe(data => console.log(data) )
  }
}
