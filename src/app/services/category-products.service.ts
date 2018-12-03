import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {
  url:string = 'http://192.168.0.4:8090/rest/product/get/';
  constructor(
    private http: HttpClient
  ) { }


  getProducts(e:string,f:number){
    return this.http.get(`${this.url}/${e}/${f}`).pipe(map(
      res => {return res}
    ));
  }
}
