import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';
import { Logo } from '@app/examples/crud/logos.model';
import { Store } from '@ngrx/store';
import { State } from '@app/examples/examples.state';
import { ActionLogosLikeOne } from '@app/examples/crud/logos.actions';

import { selectAll as d3SelectAll } from 'd3-selection';

const FORCES = {
  LINKS: 4,
  COLLISION: 1,
  CHARGE: -1
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  public options: { width: number; height: number };

  constructor(nodes, links, options: { width; height }) {
    this.nodes = nodes;
    this.links = links;
    this.options = options;

    this.initSimulation(options);
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
    //console.log(this.nodes)
    //console.log(this.simulation.nodes())
  }

  clickLogo(logo: Node, i: number): any {
    //console.log('logo');
    //console.log(logo);
    //let lo : Logo = new Logo(""+i,logo.label,logo.img)
    //this.store.dispatch(new ActionBooksLikeOne(lo));
  }

  initNodes2(nodes: Node[]) {
    d3.selectAll('nodeG')
      .exit()
      .remove();

    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force(
      'links',
      d3
        .forceLink(this.links)
        .id(d => d['id'])
        .distance(1)
        .strength(2)
    );
  }

  initLinks2(links: Link[]) {
    d3.selectAll('link')
      .exit()
      .remove();
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
    console.log(links);

    this.simulation.force(
      'links',
      d3
        .forceLink(links)
        .id(d => d['id'])
        .distance(1)
        .strength(2)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }
    d3.selectAll('nodeG')
      .exit()
      .remove();
    d3.selectAll('link')
      .exit()
      .remove();
    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation();
      /*
      this.simulation
      .force("link", d3.forceLink().distance(10))
      .force("collide",d3.forceCollide( function(d){return 10 }).iterations(16) )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(options.width / 2, options.height / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0))
      */
      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function() {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    //this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
