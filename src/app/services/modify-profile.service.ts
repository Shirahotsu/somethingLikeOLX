import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { JwtTokenService } from './jwt-token.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModifyProfileService {
  url:string = 'http://192.168.0.4:8090/rest/user/userDetails';
  url2:string = 'http://192.168.0.4:8090/rest/user/modifyProfile/';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };
  constructor(
    private http: HttpClient,
    private jwt:JwtTokenService
  ) { }
  getProfileDetails(){
    return this.http.get(this.url, this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
  sendProfileDetails(register){
    return this.http.post(this.url2, {
      firstName:    register.firstName,
      lastName:    register.lastName,
      password:     register.password,
      email:        register.email,
      place: register.place,
      zipCode: register.zipCode,
      phoneNumber: register.number,
    },
    this.httpOptions).pipe(map(
      res => {return res}
    ));
  }
}
