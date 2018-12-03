import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { JwtTokenService } from './jwt-token.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModifyProductService {
  url:string = 'http://192.168.0.4:8090/rest/product/getProductDetails/';
  url2:string = 'http://192.168.0.4:8090/rest/product/modifyProduct/';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };

  constructor(
    private http: HttpClient,
    private jwt:JwtTokenService
    ) {
  }

  getProduct(e){
    return this.http.get(this.url+e, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }

  sendModifiedProduct(e, f){
    return this.http.put(this.url2+f, {
      name: e.name,
      description: e.description,
      price: e.price
    }, this.httpOptions)
    .pipe(map(
      res => {return res}
      ));
  }
}
