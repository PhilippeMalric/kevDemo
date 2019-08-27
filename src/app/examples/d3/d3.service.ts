import { Injectable, EventEmitter } from '@angular/core';
import { Node, Link, ForceDirectedGraph } from './models';
import { event as d3Event } from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';
import { drag as d3Drag } from 'd3-drag';
import { select as d3Select } from 'd3-selection';
import { selectAll as d3SelectAll } from 'd3-selection';
import { Store } from '@ngrx/store';
import { State } from '../examples.state';
import { ActionBooksLikeOne } from '../crud/books.actions';
import { Logo } from '../crud/books.model';
import { DataService } from '../gears/data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */

  sg: ForceDirectedGraph;
  toggle: number;
  options: any;

  constructor(private http: HttpClient) {}

  getIpCliente(): Observable<any> {
    return this.http
      .get(
        PROXY_URL +
          'http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK',
        { responseType: 'text' }
      )
      .pipe(
        // ...using post request '
        map((text: any) => {
          //console.log('text ', text);
          if (!text.startsWith('<error>')) {
            //console.log('IP!');
            var pattIp = new RegExp(':.(.*..*..*).}');
            let ip = pattIp.exec(text)[1];
            //console.log(ip);
            return ip;
          } else {
            return '';
          }
        })
      ); // ...and calling .json() on the response to return data
    //.catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3Select(svgElement);

    container = d3Select(containerElement);

    zoomed = () => {
      const transform = d3Event.transform;
      container.attr(
        'transform',
        'translate(' +
          transform.x +
          ',' +
          transform.y +
          ') scale(' +
          transform.k +
          ')'
      );
    };

    zoom = d3Zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  click2(d: Node): any {
    console.log(d);
    //this.store.dispatch(new ActionBooksLikeOne(new Logo(d.id,d.label,d.img)))
    //this.dataService.click()
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3Select(element);
    console.log('d3element');
    //console.log(d3element)
    //d3element.datum(node)
    //console.log(d3element.datum())
    //d3element.on("click",this.click2)

    function started() {
      /** Preventing propagation of dragstart to parent elements */
      d3Event.sourceEvent.stopPropagation();

      if (!d3Event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3Event.on('drag', dragged).on('end', ended);

      function dragged() {
        node.fx = d3Event.x;
        node.fy = d3Event.y;
      }

      function ended() {
        if (!d3Event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3Drag().on('start', started));
  }

  /** The interactable graph we will simulate in this article
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph(
    nodes: Node[],
    links: Link[],
    options: { width; height }
  ) {
    this.options = options;
    this.sg = new ForceDirectedGraph(nodes, links, options);
    return this.sg;
  }

  changeForceDirectedGraph(nodes: Node[]) {
    console.log('change');
    //this.sg.nodes = nodes
    this.sg.simulation.nodes(nodes);
    return this.sg;
  }

  getNodes() {}

  changeColor(node, index) {
    console.log(node);
    let color = (index + this.toggle) % 2 ? 'red' : 'blue';
    console.log(color);
    return color;
  }

  click(nodes: Node[], links: Link[], options) {
    this.toggle = this.toggle == 0 ? 1 : 0;
    let node = d3SelectAll('.node')
      .data(nodes)
      .attr('fill', this.changeColor);
  }
}
