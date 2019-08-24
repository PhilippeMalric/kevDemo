import { v4 as uuid } from 'uuid';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS, selectName, AppState } from '@app/core';

import { State } from '../../examples.state';
import { Logo, Vote } from '../logos.model';
import {
  ActionLogosUpsertOne,
  ActionLogosDeleteOne,
  ActionLogosLikeOne
} from '../logos.actions';
import { selectSelectedLogos, selectAllLogos } from '../logos.selectors';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap, take } from 'rxjs/operators';
import { Logos_KEY, DICT_uID_FB } from '../logos.effects';
import { DataService } from '@app/examples/gears/data.service';
import { Node } from '@app/examples/d3';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  logoFormGroup = this.fb.group(CrudComponent.createLogo());
  myLogos: Logo[] = [];
  selectedLogo$: Observable<Logo> = this.store.pipe(
    select(selectSelectedLogos)
  );
  selectedLogo: string = null;
  isEditing: boolean;
  entitiesLogo$: Observable<Logo[]>;
  authName$: Observable<any>;
  authName: string;
  vote: Vote;
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
    private store2: Store<AppState>,
    private afs: AngularFirestore,
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router,
    private dataS: DataService
  ) {
    this.authName$ = this.store2.pipe(select(selectName));
    this.authName$.pipe(take(1)).subscribe(user => {
      this.authName = user;
      console.log('authName');
      console.log(user);
    });

    this.store.pipe(select(selectAllLogos)).subscribe(logos => {
      console.log(logos);
      this.myLogos = logos;
    });

    /*
      ,
      tap((books: Book[])=> {

        if (this.selectedBook){
          this.router.navigate(['examples/crud',this.selectedBook])
        }
      })
      */
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
  ngOnInit(): void {}

  onInputChange(event, logo, i) {
    console.log('event');
    console.log(event);

    this.myLogos[i] = Object.assign({}, this.myLogos[i], {
      niveauDaccord: event.value
    });
    console.log(this.myLogos[i]);
  }
  textChange(event, i) {
    console.log('event');
    console.log(event);
    this.myLogos[i] = Object.assign({}, this.myLogos[i], {
      commentaire: event.srcElement.value
    });
    console.log(this.myLogos[i]);
  }

  select(logo: Logo) {
    console.log('selected');
    this.isEditing = false;

    this.selectedLogo = logo.id;

    this.router.navigate(['logoBattle/crud', this.selectedLogo]);
  }

  launch(logo: Logo) {
    console.log('book223');
    console.log(logo);
    console.log(this.authName);
    this.store.dispatch(new ActionLogosUpsertOne({ logo: logo }));
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['logoBattle/crud']);
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
              this.dataS.logoKey.next(id);
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
    this.router.navigate(['logoBattle/crud']);
  }

  save() {
    if (this.logoFormGroup.valid) {
      const logo = this.logoFormGroup.value;
      this.store.dispatch(new ActionLogosUpsertOne({ logo: logo }));
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
