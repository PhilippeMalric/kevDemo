import { AppConfig } from '../../../configs/app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  num?: string | null;
  img?: string | null;
  texte?: string | null;
  label?: string | null;
  box?: any | null;
  avg?: number | null;
  win?: number | null;
  id: string;
  linkCount: number = 0;
  niveau: any;
  p?:string
  pos?:string
  constructor(id, img, label, niveau, x, y, avg, win,texte="") {
    this.id = id;
    this.img = img;
    this.label = label;
    this.niveau = niveau;
    this.box = {};
    this.x = x;
    this.y = y;
    this.avg = avg;
    this.win = win;
    this.texte = texte
  }

  normal = () => {
    return Math.sqrt(this.linkCount / AppConfig.N);
  };

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return 30 * this.normal() + 10 + 'px';
  }

  get color() {
    let index = Math.floor(AppConfig.SPECTRUM.length * this.normal());
    return AppConfig.SPECTRUM[index];
  }
}
