import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtTokenService } from './jwt-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewestProductsService {
  url:string = 'http://192.168.0.4:8090/rest/product/getNewestProducts/';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };

  constructor(
    private http: HttpClient,
    private jwt:JwtTokenService
  ) { }

  getProducts(e:number){
    return this.http.get(this.url+e, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
}
