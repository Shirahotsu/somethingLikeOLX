import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url:string ='http://192.168.0.4:8090/rest/search';
  url2:string ='http://192.168.0.4:8090/rest/product/getProductsByName';
  constructor(
    private http: HttpClient
  ) { }

  getSearchResult(phrase:string){
    return this.http.get(`${this.url}/${phrase}`).pipe(map(
      res => {return res}
    ));
  }
  getProductsFromSearch(phrase:string){
    return this.http.get(`${this.url2}/${phrase}`).pipe(map(
      res => {return res}
    ));
  }
}
