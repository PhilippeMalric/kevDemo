import { EntityState } from '@ngrx/entity';

export class Logo {
  id: string;
  texte: string;
  url_img: string;
  style?: string;
  aimez?: boolean;
  niveauDaccord: number;
  commentaire: string;
  x?: number;
  y?: number;
  avg?: number;
  win?: number;
  constructor(
    id: string,
    texte: string,
    url_img: string,
    niveauDaccord = 0,
    style: string,
    aimez,
    commentaire,
    x,
    y,
    avg = 0,
    win = 0
  ) {
    this.id = id;
    this.texte = texte;
    this.url_img = url_img;
    this.style = style;
    this.aimez = aimez;
    this.niveauDaccord = niveauDaccord;
    this.commentaire = commentaire;
    this.x = x;
    this.y = y;
    this.avg = avg;
    this.win = win;
  }
}

export interface LogoState extends EntityState<Logo> {}
