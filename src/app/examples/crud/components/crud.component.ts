import { v4 as uuid } from 'uuid';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { selectEmail } from "../../../core/auth/auth.selectors"

import { ROUTE_ANIMATIONS_ELEMENTS, AppState } from '@app/core';

import { State } from '../../examples.state';
import { Logo } from '../logos.model';
import {
  ActionLogosUpsertOne,
  ActionLogosDeleteOne,
  ActionLogosLikeOne,
  ActionLogosUpsertOneLocal,
  ActionLogosChangeONENiveau,
  ActionLogosSaveONE
} from '../logos.actions';
import { selectSelectedLogos, selectAllLogos } from '../logos.selectors';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap, take } from 'rxjs/operators';
import { Logos_KEY, DICT_uID_FB } from '../logos.effects';
import { DataService } from '@app/examples/gears/data.service';
import { Node } from '@app/examples/d3';
import { JeuState } from '@app/examples/authenticated/jeu.model';
import { Vote, VoteState } from '../vote.model';
import { ActionVoteUpsertAll, ActionVoteUpsertOne } from '../vote.actions';
import { selectAllVote } from '../vote.selectors';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  logoFormGroup = this.fb.group(CrudComponent.createLogo());
  myLogos$: Observable<Logo[]> = of([]);
  selectedLogo$: Observable<Logo> = this.store.pipe(
    select(selectSelectedLogos),
    tap(()=> this.ref.markForCheck())
  );
  selectedLogo: string = null;
  isEditing: boolean;
  entitiesLogo$: Observable<Logo[]>;
  authName$: Observable<any>;
  authName: string;
  vote: Vote;
  votes: any;

  static createLogo(): Logo {
    return {
      id: uuid(),
      texte: '-',
      url_img: '-',
      niveauDaccord: 0,
      commentaire: '',
      x: 200,
      y: 200
    };
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private afs: AngularFirestore,
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router,
    private jeuStore: Store<JeuState>,
    private voteStore: Store<VoteState>,
    public dataS: DataService,
    private ref: ChangeDetectorRef,
  ) {
    this.votes = []
    this.dataS.getVotesSubject()

    this.authName$ = this.store.pipe(select(selectEmail));
    this.authName$.pipe(take(1)).subscribe(user => {
      this.authName = user;
      console.log('authName');
      console.log(user);
    });

    this.myLogos$ =  this.store.pipe(
      select(selectAllLogos),
      tap((logos=>{
        console.log("Change logos")
        console.log(logos)
        if(this.selectedLogo){
          this.dataS.votesSubject.next(this.selectedLogo)
        }
      }))
    )
    if(this.selectedLogo){
      this.dataS.votesSubject.next(this.selectedLogo)
    }
    /*
      ,
      tap((books: Book[])=> {

        if (this.selectedBook){

        }
      })
      */
  }


  ngOnInit(): void {

    console.log("init")
    if(this.selectedLogo){
      this.dataS.votesSubject.next(this.selectedLogo)
    }

  }

  getColor(n: number) {
    let r = '';
    switch (n) {
      case 0:
        r = '';
      case 1:
        r = 'red';
      case 2:
        r = 'red2';
      case 3:
        r = 'green';
      case 4:
        r = 'blue2';
      case 5:
        r = 'blue';
      default:
        r = '';
    }
    return r;
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onInputChange(event, i) {
    console.log('event');
    console.log(event);


    this.myLogos$.pipe(take(1)).subscribe(
      (logos:any[])=>{
        let logo = JSON.parse(JSON.stringify(logos[i]))
        logo.niveauDaccord = event.value;
        this.store.dispatch(new ActionLogosUpsertOneLocal({logo:logo}))
    }
    )
  }

  onTextInputChange(event, i) {
    console.log('event');
    console.log(event);


    this.myLogos$.pipe(take(1)).subscribe(
      (logos:any[])=>{
        let logo = JSON.parse(JSON.stringify(logos[i]))
        logo.commentaire = event.srcElement.value;
        this.store.dispatch(new ActionLogosUpsertOneLocal({logo:logo}))
    }
    )
}

  select(logo: Logo) {
    console.log('selected');
    this.isEditing = false;

    this.selectedLogo = logo.id;
    this.dataS.votesSubject.next(this.selectedLogo)
    this.dataS.votes$.subscribe((votes:Vote[])=>{
      console.log("Votes!!")
      console.log(votes)
      this.votes = votes
      this.ref.markForCheck()
    })
    this.router.navigate(['app/crud/',this.selectedLogo])
  }

  select2(id: string) {
    console.log('selected2');
    this.isEditing = false;

    this.selectedLogo = id;
    this.dataS.votesSubject.next(this.selectedLogo)
    this.dataS.votes$.subscribe((votes:Vote[])=>{
      console.log("Votes!!")
      console.log(votes)
      this.votes = votes
      this.ref.markForCheck()
    })
  }


  //Apparament myLogo n'est pas ajour!
  launch(i: number) {
    this.store.pipe(take(1)).subscribe(
      (state:State)=>{
        console.log("lauch state");
        console.log(state);

        let id = state.examples.logos.ids[i]
        let logo = state.examples.logos.entities[id]
        console.log("store logo!!!!!");
        console.log(logo);
        console.log(this.authName);
        if (this.authName) {
          console.log(this.authName);
          this.store.dispatch(
            new ActionVoteUpsertOne({
              vote: {
                id: this.authName + '&;&' + logo.id,
                nom: this.authName,
                logo: logo.id,
                niveauDaccord: logo.niveauDaccord,
                commentaire: logo.commentaire
              }
            })
          );
        } else {
          let vote = {
            vote: {
              id: 'DEMO-' + logo.id,
              nom: 'test',
              logo: logo.id,
              niveauDaccord: logo.niveauDaccord,
              commentaire: logo.commentaire
            }
          };
          console.log('vote');
          console.log(vote);
          this.voteStore.dispatch(new ActionVoteUpsertOne(vote));
        }

    })

    //this.store.dispatch(new ActionLogosUpsertOne({ logo: logo }));
    //this.jeuStore.dispatch(new ActionJeuUpsertAllCartes({ carte: {valeur:logo.niveauDaccord,couleur:"",noms:[]} }));
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['app/crud']);
  }

  edit(logo: Logo) {
    this.isEditing = true;
    this.logoFormGroup.setValue(logo);
  }

  reInitLogo() {
    this.store.pipe(take(1)).subscribe(store => {
      let newStore = JSON.parse(JSON.stringify(store));
      newStore.examples.logoss = { ids: [], entities: {} };
      let ref = this.afs
        .collection('logos')
        .ref.add(store)
        .then(res => {
          let id = res.id;
          let newObj = {};
          newObj[store.auth.uid] = id;
          this.afs
            .collection('logos')
            .doc(DICT_uID_FB)
            .update(newObj)
            .then(() => {
              console.log(id)
              //this.dataS.logoKey.next(id);
            });
        });
    });
  }

  addNew(logoForm: NgForm) {
    //this.test()
    logoForm.resetForm();
    this.logoFormGroup.reset();
    this.logoFormGroup.setValue(CrudComponent.createLogo());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(logo: Logo) {
    this.store.dispatch(new ActionLogosDeleteOne({ id: logo.id }));
    this.isEditing = false;
    this.router.navigate(['app/crud']);
  }

  save() {
    if (this.logoFormGroup.valid) {
      const logo = this.logoFormGroup.value;
      this.store.dispatch(new ActionLogosSaveONE({ logo: logo }));
      this.isEditing = false;
      console.log('logo.id');
      console.log(logo.id);
      this.selectedLogo = logo.id;
    }
  }

  like(logo) {
    console.log('book22');
    console.log(logo);
    console.log(this.authName);
    /*
    let book1 = this.myBooks.filter((book2:Book)=>{
      return book2.id == book.id
    })[0]
    book1.aimez = (book.aimez)?false:true
    book1.niveauDaccord = (book.aimez)?5:1
    this.store.dispatch(new ActionBooksLikeOne({vote:{nom:this.authName,niveauDaccord:book1.niveauDaccord,commentaire:book.commentaire}, book:book1}))
    */
    //book.niveauDaccord
    //book.commentaires
  }
}
