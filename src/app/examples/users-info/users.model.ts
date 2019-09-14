import { EntityState } from '@ngrx/entity';

export class User {
  id: string;
  texte: string;
  url_img: string;
  name: string;
  constructor(
    id: string,
    texte: string,
    url_img: string,
    name: string
  ) {
    this.id = id;
    this.name = name;
    this.texte = texte;
    this.url_img = url_img;
  }
}

export interface UserState extends EntityState<User> {}
