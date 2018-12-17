import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Register } from '@models/register.model';
import { map } from "rxjs/operators";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    observe: 'response'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url:string = 'http://192.168.0.4:8090/rest/user/addUser';
  url2:string = 'http://25.39.174.175:8090/rest/user/addUser';
  public rs:any;
  constructor(private http: HttpClient) {

   }
  //  napraw return boolean
   sendRegisterForm(register:Register):any{
    return this.http.post<any>(this.url, {
      firstName:    register.firstName,
      lastName:    register.lastName,
      password:     register.password,
      email:        register.email,
      phoneNumber: register.number,
      place: register.place,
      zipCode: register.zipCode,
      newsletter:   register.newsletter,
    }, httpOptions).pipe(map(res => {return res}));
  }


}
