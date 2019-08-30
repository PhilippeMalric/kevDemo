import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';

@Component({
  selector: '[nodeVisual2]',
  template: `
    <svg:g class="nodeG" [attr.transform]="'translate(200,' + node.y + ')'">
    <svg:image
    class="node"
    [attr.xlink:href]="node.img"
    x="-25"
    y="-25"
    width="50"
    height="50"
    (click)="click()">
</svg:image>
<svg:text
    class="node-name"
    y="-35"
    [attr.font-size]="node.fontSize"
    >
      {{node.label}}
</svg:text>
<svg:text
    class="node-win"
    y="5"
    x="200"
    [attr.font-size]="35"
    >
     Points de victoire : {{node.win}}
</svg:text>
<!--
<svg:text
    class="node-position"
    y="10"
    x="400"
    [attr.font-size]="30"
    >
      Position : {{""+Number(node.pos) - 200}}
</svg:text>
-->
    </svg:g>
  `,
  styleUrls: ['./node-visual2.component.css']
})
export class NodeVisualComponent2 {
  @Input('nodeVisual2') node: Node;

  constructor(){

  }

  click() {
    console.log('clickTest');
  }
}
