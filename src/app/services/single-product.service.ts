import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SingleProductService {
  url:string = 'http://192.168.0.4:8090/rest/product/productById/';
  constructor(
    private http:HttpClient
  ) { }

  getSingleProduct(id:number){
    return this.http.get(this.url+id).pipe(map(
      res => {return res}
    ));
  }
}
