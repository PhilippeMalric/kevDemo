import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PixBayService } from './pixBay.service';




@Component({
  selector: 'anms-pixabay',
  templateUrl: './pixabay.component.html',
  styleUrls: ['./pixabay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PixabayComponent implements OnInit {
  imgs$: any;

  constructor(private pixBayService:PixBayService) { }


  changed(data:any){
    console.log("changed()")
    console.log("data")
    console.log(data)

    this.imgs$ = this.pixBayService.images(data)
  }

  ngOnInit() {
  }

}
