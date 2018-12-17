import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { JwtTokenService } from './jwt-token.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MyProductsService {
  url:string = 'http://192.168.0.4:8090/rest/product/myProducts';
  url2:string = 'http://192.168.0.4:8090/rest/product/deleteProduct/';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };
  constructor(
    private http: HttpClient,
    private jwt:JwtTokenService
  ) { }

  getMyProducts(){
    return this.http.get(this.url, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
  deleteMyProducts(productId:number){
    return this.http.get(this.url2+productId, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
}
