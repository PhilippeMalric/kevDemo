import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { PixbayState, Pixbay } from './pixbay.model';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class PixBayService {
  research: Pixbay;

  constructor(public store: Store<PixbayState>,private httpClient: HttpClient) {
  }

  images(symbol: string): Observable<any> {
  let url =  encodeURIComponent(symbol)
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8')
  return this.httpClient
    .get(PROXY_URL + `https://pixabay.com/api/?key=13704344-3d96c01d3898ddc4eda8debce&q=${url}&image_type=photo`,{headers})
    .pipe(
      tap((data:any)=>{
        console.log("data")
        console.log(data)
        console.log("data.hits")
        console.log()
        console.log("première image")
        console.log(data.hits[0].largeImageURL)
      }
      ),
      map((data)=>{
        return data.hits.slice(1, 10)
      }))


  }

}
