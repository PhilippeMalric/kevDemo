import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Node } from '@app/examples/d3';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  node$: BehaviorSubject<Node[]>;

  constructor() {
    this.node$ = new BehaviorSubject<Node[]>([]);
  }
}
