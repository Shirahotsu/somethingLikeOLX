import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtTokenService } from './jwt-token.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NumberRequestService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };
  url:string = 'http://192.168.0.4:8090/rest/user/sendRequestPhone/';
  url2:string = 'http://192.168.0.4:8090/rest/user/myRequestList';
  url3:string = 'http://192.168.0.4:8090/rest/user/acceptRequestPhone/';
  url4:string = 'http://192.168.0.4:8090/rest/product/productByIdWithToken/';
  constructor(
    private http: HttpClient,
    private jwt:JwtTokenService
  ) { }

  sendRequestForANumber(userId:number){
    return this.http.get(this.url+userId, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }

  getNumbersRequests(){
    return this.http.get(this.url2, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
  acceptNumberRequest(userId:number){
    return this.http.get(this.url3+userId, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
  isRequestAccepted(productId:number){
    return this.http.get(this.url4+productId, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
}
