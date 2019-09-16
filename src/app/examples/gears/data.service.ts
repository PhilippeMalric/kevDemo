import { Injectable } from '@angular/core';
import { Link } from '../d3';
import { Node } from '../d3';
import { Subject, BehaviorSubject } from 'rxjs';
import { Logos_KEY } from '../crud/logos.effects';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { State } from '../examples.state';
import { tap, map, take, withLatestFrom } from 'rxjs/operators';
import { Logo } from '../crud/logos.model';
import { ActionLogosUpsertAll } from '../crud/logos.actions';
import { vote_key } from '../crud/vote.effects';

@Injectable()
export class DataService {
  links: Link[];

  scian: any;
  cnp: any;
  cnpToScian: any;
  lastX: Object;
  logoKey: Subject<string>;

  constructor(private afs: AngularFirestore, public store: Store<State>) {
    this.logoKey = new BehaviorSubject<string>(Logos_KEY);
    this.lastX = {}
  }

  click() {
    console.log('Hello');
  }

  fireStoreVotes() {
    return this.afs
      .collection('votes')
      .doc(vote_key)
      .valueChanges()
      .pipe(
        tap((data: any) => {
          console.log('Votes dispatch : ');
          console.log(data);
        })
        )
  }

convertVote(obj,logo:Logo,auth,authEmail){
  if(auth){
    console.log("authEmail")
    console.log(authEmail)
    if(authEmail+"&;&"+logo.id in obj[1].examples.votes.entities){
      return   obj[1].examples.votes.entities[authEmail+"&;&"+logo.id].niveauDaccord
    }
    else{
      return 0
    }

  }
  else{
    if("DEMO&;&"+logo.id in obj[1].examples.votes.entities){
      return   obj[1].examples.votes.entities["DEMO&;&"+logo.id].niveauDaccord
     }
     else{
       return 0
     }
  }
}

convertVoteCommentaire(obj,logo:Logo,auth,authEmail){
  if(auth){
    console.log("authEmail")
    console.log(authEmail)
    if(authEmail+"&;&"+logo.id in obj[1].examples.votes.entities){
      return   obj[1].examples.votes.entities[authEmail+"&;&"+logo.id].commentaire
    }
    else{
      return ""
    }

  }
  else{
    if("DEMO&;&"+logo.id in obj[1].examples.votes.entities){
      return   obj[1].examples.votes.entities["DEMO&;&"+logo.id].commentaire
     }
     else{
       return ""
     }
  }
}

  fireStoreLogoObs(key: string) {
    console.log('Key2 : ' + key);

    return this.afs
      .collection('logos')
      .doc(key)
      .valueChanges()
      .pipe(
        tap((store:any) => {
          //console.log('!!dispatch : ');
          //console.log(store);
        }),
        withLatestFrom(this.store),
        map((obj: any) => {
          if(obj[0].examples){
            let newEntities = {}
            let newLogo = JSON.parse(JSON.stringify(obj[0].examples.logos))



            let tab = newLogo.ids.map((id => newLogo.entities[id] ))
            if(obj[1].auth.isAuthenticated){
              tab.map((logo => {
                logo.niveauDaccord = this.convertVote(obj,logo,true,obj[1].auth.email)
                logo.commentaire = this.convertVoteCommentaire(obj,logo,true,obj[1].auth.email)
                newEntities[logo.id]= logo
              }))
            }
            else{
              tab.map((logo => {
                logo.niveauDaccord = this.convertVote(obj,logo,false,"")
                logo.commentaire = this.convertVoteCommentaire(obj,logo,false,"")

                newEntities[logo.id]= logo
              }))
            }

            newLogo.entities = newEntities
            return newLogo
          }
          else{
            return []
          }


      }),

      map((obj: any) => obj.entities),

      map(entities => {
        return (entities)?Object.keys(entities).map((k: string) => entities[k]):[]
      }),

      tap(logos => {

          let logos3 = JSON.parse(JSON.stringify(logos))
          //console.log('dispatch : ');
          //console.log(logos)
          for (let i in logos){
            logos3[i].niveauDaccord = 1
          }

         //this.store.dispatch(new ActionLogosUpsertAll({ logos: logos3 }));
        }));
  }
}
