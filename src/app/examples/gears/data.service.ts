import { Injectable } from '@angular/core';
import { Link } from '../d3';
import { Node } from '../d3';
import { Subject, BehaviorSubject } from 'rxjs';
import { Logos_KEY } from '../crud/logos.effects';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { State } from '../examples.state';
import { tap, map, take } from 'rxjs/operators';
import { Logo } from '../crud/logos.model';
import { ActionLogosUpsertAll } from '../crud/logos.actions';

@Injectable()
export class DataService {
  links: Link[];

  scian: any;
  cnp: any;
  cnpToScian: any;

  logoKey: Subject<string>;

  constructor(private afs: AngularFirestore, public store: Store<State>) {
    this.logoKey = new BehaviorSubject<string>(Logos_KEY);
  }

  click() {
    console.log('Hello');
  }

  fireStoreVotes() {
    return this.afs
      .collection('votes')
      .doc('rUsx9vFEVq4il8FWX1w0')
      .valueChanges()
      .pipe(
        tap((data: any) => {
          console.log('Votes dispatch : ');
          console.log(data);
        }),
        map((data: any) => {
          return data.entities;
        }),
        tap((data: any) => {
          console.log('Votes dispatch 2 : ');
          console.log(data);
        })
      );
  }

  fireStoreObservable(key: string) {
    console.log('Key2 : ' + key);

    return this.afs
      .collection('logos')
      .doc(key)
      .valueChanges()
      .pipe(
        tap((logos: Logo[]) => {
          console.log('!!dispatch : ');
          console.log(logos);
        }),
        map((obj: any) => obj.examples.logos),
        map((obj: any) => obj.entities),

        map(entities => {
          return Object.keys(entities).map((k: string) => entities[k]);
        }),
        /*
      map((books:Book[]) => {
        console.log("books11");
        console.log(books);
        return books.map((book:Book)=>{
          let leVote = null
          if(book.votes){
            leVote = book.votes.filter((vote)=>{
              return vote.nom == this.authName
            })
          }
          else{
            leVote = []
          }


          let vote:Vote = null
          if(leVote.length > 0){
            vote = leVote[0]
            book.niveauDaccord = vote.niveauDaccord
            book.commentaire = vote.commentaire
            book.style = this.getColor(vote.niveauDaccord)
          }
          else{
            book.commentaire = ""
            book.niveauDaccord = 0
            book.style = ""
          }

          return book
        })
      })
      ,
      */
        tap((logos: Logo[]) => {
          console.log('dispatch : ');
          let logos2 = logos.map(
            logo =>
              new Node(
                logo.id,
                logo.url_img,
                logo.texte,
                logo.niveauDaccord,
                logo.x,
                logo.y,
                logo.avg
              )
          );
          this.store.dispatch(new ActionLogosUpsertAll({ logos: logos }));
        })
      );
  }
}
