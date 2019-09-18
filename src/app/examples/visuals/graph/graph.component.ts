import {
  Component,
  Input,
  ChangeDetectorRef,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { D3Service, ForceDirectedGraph, Node, Link } from '../../d3';
import { DataService } from '@app/examples/gears/data.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Store, select } from '@ngrx/store';
import { State } from '@app/examples/examples.state';
import { selectAllLogos } from '@app/examples/crud/logos.selectors';
import {
  ActionLogosLikeOne,
  ActionLogosUpsertAll,
  ActionLogosUpsertAll2,
  ActionLogosUpsertOne,
  ActionLogosAddWin
} from '@app/examples/crud/logos.actions';
import { Observable } from 'rxjs';
import { NodeService } from './node.service';
import { Logo } from '@app/examples/crud/logos.model';
import { take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Logos_KEY } from '@app/examples/crud/logos.effects';
import { Router } from '@angular/router';
import { BoundElementProperty } from '@angular/compiler';
import { ActionVoteUpsertAll,ActionVoteUpsertAll2 } from '../../crud/vote.actions';


@Component({
  selector: 'app-graph',
  templateUrl: 'graph.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, AfterViewInit {
  nodes: Node[];
  links: Link[];
  graph: ForceDirectedGraph;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  public _options: { width; height } = { width: 400, height: 400 };

  nodesForHisto: Node[]

  height: string;

  x:number
  y:number

  x2:number
  y2:number

  scx: number;
  scy: number;
  fin: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(
    private d3Service: D3Service,
    private ref: ChangeDetectorRef,
    private dataS: DataService,
    public store: Store<State>,
    private nodeService: NodeService,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.fin = false
    this.nodesForHisto = []

    this.x = 0.5 * this.options.width
    this.y = 0

    this.x2 = this.options.width
    this.y2 = this.options.height * 2


    this.links = [];
    router.events.subscribe(val => {
      if (this.nodes) {
        this.height = '' + (this.nodes.length * 100 + 100);
        this.ref.markForCheck();
      }
    });
    //this.getDataOnce()
  }



center(){
  let xs = this.nodes.map((node)=>{
  return node.x
  })

  let max = 0
  let max_i = 0

  for(let i in xs)
  {
    if(xs[i]>max){
      max = xs[i]
      max_i = Number(i)
    }

  }
  this.y  = this.nodes[max_i].y - (this.graph.options.height / 2)
  this.x = max - ((this.graph.options.width/2)-100)
  this.x2 = this.options.width
  this.y2 = this.options.height
  this.ref.markForCheck();

}

  getData() {
    this.store.pipe(select(selectAllLogos)).subscribe((logos: any) => {
      this.height = '' + (logos.length * 100 + 100);
      this.ref.markForCheck();
      //console.log('logos!! from graph');
      //console.log(logos);
      let tab = Object.keys(logos);
      let dict = logos;
      this.nodeService.node$.next(
        tab.map(
          (k, i) =>
            new Node(
              dict[k].id,
              dict[k].url_img,
              dict[k].texte,
              dict[k].niveauDaccord,
              dict[k].x,
              dict[k].y,
              dict[k].avg,
              dict[k].win
            )
        )
      );
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.updateLogo();
    this.getData();

    /*
    this.store.pipe(
        select(selectAllLogos),
        take(1)

      ).subscribe(
      (logos)=>{
        console.log(logos)

        this.nodeService.node$.next(logos.map((logo,i)=>new Node(logo.id,logo.url_img,logo.texte,logo.niveauDaccord,0,0)))

    });
    //this.d3Service.createNodeLabels(this.nodes)
    */
  }

  updateLogo() {
    this.nodeService.node$.pipe().subscribe((nodes: Node[]) => {
      if (this.graph) {
        this.nodes = nodes;
        this.nodesForHisto = JSON.parse(JSON.stringify(this.nodes))


          for(let i in this.nodes){
            if(1){
            this.nodes[i].p = i
            }
          }
        this.nodesForHisto.sort((node1,node2)=>
        {
          if(node1.x < node2.x){
            return 1
          }
          if(node1.x > node2.x){
            return -1
          }
          if(node1.win < node2.win){
            return 1
          }
          if(node1.win > node2.win){
            return -1
          }
          return 0
        })

        for (let i in this.nodesForHisto){
          if(1){

            let node = this.nodesForHisto[i]

            node.pos = this.nodes[node.p];
            node.y =  (Number(i) * 100 + Number(this.height) +50)
          }
        }

       // console.log('graph exist');
        this.ref.markForCheck();
        //this.graph = this.d3Service.changeForceDirectedGraph(this.nodes)
        //this.nodes = this.graph.simulation.nodes
      } else {
        this.nodes = nodes;
        console.log('new graph');
        this.graph = this.d3Service.getForceDirectedGraph(
          this.nodes,
          this.links,
          this.options
        );
        this.graph.initSimulation(this.options);
        this.graph.ticker.subscribe(d => {
          this.ref.markForCheck();
        });
        //this.nodes = this.graph.simulation.nodes
      }
    });
  }

  clickButton() {
    console.log(this.nodes);
    console.log(this.links);

    this.nodes = this.nodes.slice(0, this.nodes.length - 1);
    this.links = this.links.slice(0, this.links.length - 1);
    this.links[this.links.length - 1].target = 0;
    this.graph = this.d3Service.changeForceDirectedGraph(this.nodes);

    this.d3Service.click(this.nodes, this.links, this.options);
  }

  clickButton2() {
    this.d3Service.getIpCliente().subscribe(ip => {
      console.log('ip:' + ip);
    });

    /*
    console.log(this.nodes)
    console.log(this.links)

    let node : Node = new Node(this.nodes.length-1,"","",0)


    this.nodes.push(node)
    this.links.push(new Link(this.links.length -1,0,0))
    this.links[this.links.length-2].target = this.nodes[this.links.length-1]
    this.graph = this.d3Service.changeForceDirectedGraph(this.nodes, this.links);

    node.x = this.options.width / 2
    node.y = this.options.height / 2

    //this.d3Service.click(this.nodes,this.links, this.options)
    */
  }
  clickButton3() {
    //this.dataS.fireStoreObservable("ioy7jLywmRi3wBoJ2itl")
  }

  clickButton4() {
    console.log('nodes');
    console.log(this.nodes);

    let newNodes: any[] = this.nodes.map(node => {
      let wi = this.options.width / 2;
      let he = this.options.height / 2;

      return {
        ...node,
        x: Math.random() * 100 - 50 + wi,
        y: Math.random() * 200 - 100 + he
      };
    });
    this.store.dispatch(
      new ActionLogosUpsertAll({
        logos: newNodes.map((node, i) => {
          console.log('node');
          console.log(node);
          return new Logo(
            node.id,
            node.texte,
            node.img,
            node.niveau,
            '',
            false,
            node.commentaire,
            node.x,
            node.y,
            node.avg,
            node.win
          );
        })
      })
    );
  }

  nextStep = node => {
    if (!node.avg) {
      node.avg = 0;
    }
    return node.x + Math.random() * (20 + 10 * node.avg) + 20;
  };

  start() {
    this.fin = false;
    /*
    let interval = setInterval(() => {
      if (!this.fin) {
        this.store.dispatch(
          new ActionLogosUpsertAll2({
            logos: this.nodes.map((node: Node, i) => {
              return new Logo(
                node.id,
                node.label,
                node.img,
                node.niveau,
                '',
                false,
                node.texte,
                this.nextStep(node),
                node.y,
                node.avg,
                node.win
              );
            })
          })
        );

        let filtra = this.nodes.filter(node => {
          return node.x > 6200;
        });



        if (filtra.length > 0) {
          this.nodes.sort((logo1:Node,logo2:Node)=>
          {
            if(logo1.x < logo2.x){
                return -1
              }
            if(logo1.x > logo2.x){
                return 1
              }
              return 0
          })

          for(let i in this.nodes){
            if(1){
              this.nodes[i].win +=Number(i)+1
            }
          }

          this.fin = true;

          this.store.dispatch(new ActionLogosAddWin(
            {logos:
            this.nodes.map((node)=>{
              return new Logo(
                node.id,
                node.label,
                node.img,
                node.niveau,
                '',
                false,
                node.texte,
                this.nextStep(node),
                node.y,
                node.avg,
                node.win
              )

            }

          )
          )
          setTimeout(() => {
            this.reset()
          }, 10000);

        }
      } else {
        clearInterval(interval);
      }
    }, 250);
    */
  }

  reset() {
    this.x = 0.5 * this.options.width
    this.y = 0
    this.fin = false
    this.x2 = this.options.width
    this.y2 = this.options.height * 2
    this.store.dispatch(
      new ActionLogosUpsertAll2({
        logos: this.nodes.map((node, i) => {
          let txt = ""
          if(node.texte){
            txt = node.texte
          }

          return new Logo(
            node.id,
            node.label,
            node.img,
            node.niveau,
            '',
            false,
            txt,
            200,
            i * 100 + 100,
            node.avg,
            node.win
          );
        })
      })
    );
    this.ref.markForCheck();
  }

  resetDb() {
    this.store.dispatch(
      new ActionVoteUpsertAll2({ votes: [] })
    );
  }

  get options() {
    return (this._options = {
      width: window.innerWidth - 50,
      height: window.innerHeight - 200
    });
  }
}
