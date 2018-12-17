import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url:string ='http://192.168.0.4:8090/rest/search';
  constructor(
    private http: HttpClient
  ) { }

  getSearchResult(phrase:string){
    return this.http.get(`${this.url}/${phrase}`).pipe(map(
      res => {return res}
    ));
  }
}
