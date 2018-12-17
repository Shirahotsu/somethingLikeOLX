import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtTokenService } from './jwt-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {

  url:string = 'http://192.168.0.4:8090/rest/product/getNewestProducts';
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


  getProducts(category:number, x:number){
    console.log(this.url+'/'+category+'/'+x);

    return this.http.get(this.url+'/'+category+'/'+x).pipe(map(
      res => {return res}
    ));
  }
  getProductsNumber(e:number){
    return this.http.get(`${this.url2}/${e}`).pipe(map(
      res => {return res}
    ));
  }
}
