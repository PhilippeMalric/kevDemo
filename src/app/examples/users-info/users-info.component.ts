import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../examples.state';
import { User } from './users.model';
import { selectAllUsers } from './user.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersInfoComponent implements OnInit {

  cardListOnline$: Observable<User[]>
  cardListOffline$: Observable<User[]>
  constructor( private store: Store<State>) {



    this.cardListOnline$ =  this.store.pipe(select(selectAllUsers),
                            map((users:User[])=>{
                              return users.filter((user:User)=>{
                                return user.texte == "online"
                              })
                            }))
    this.cardListOffline$ =  this.store.pipe(
                              select(selectAllUsers),
                              map((users:User[])=>{
                                return users.filter((user:User)=>{
                                  return user.texte == "offline"
                                })
                              })
                              )






   }

  ngOnInit() {
  }

}
