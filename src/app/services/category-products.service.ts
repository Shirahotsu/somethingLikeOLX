import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtTokenService } from './jwt-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {

  url:string = 'http://192.168.0.4:8090/rest/product/get';
  url2:string = 'http://192.168.0.4:8090/rest/product/getProductCount';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };
  constructor(
    private http: HttpClient,
    private jwt:JwtTokenService
  ) { }


  getProducts(e:number, f:number){
    return this.http.get(`${this.url}/${e}/${f}`, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
  getProductsNumber(e:number){
    return this.http.get(`${this.url}/${e}`, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
}
