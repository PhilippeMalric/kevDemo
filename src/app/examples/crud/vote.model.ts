import { EntityState } from '@ngrx/entity';

export class Vote {
  id: string;
  nom: string;
  niveauDaccord: number;
  commentaire: string;
  logo: string;

  constructor(
    id: string,
    nom: string,
    logo: string,
    niveauDaccord: number,
    commentaire: string
  ) {
    this.id = id;
    this.nom = nom;
    this.logo = logo;
    this.niveauDaccord = niveauDaccord;
    this.commentaire = commentaire;
  }
}

export interface VoteState extends EntityState<Vote> {}
