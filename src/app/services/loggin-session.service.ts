import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { stringify } from '@angular/compiler/src/util';
import { JwtTokenService } from './jwt-token.service';
import { InfoModalService } from './info-modal.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    observe: 'response'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LogginSessionService {
  httpOptions2 = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };
  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  url1:string = 'http://192.168.0.4:8090/rest/user/signIn';
  url2:string = 'http://192.168.0.4:8090/rest/category/allCategories';
  date:Date;
  constructor(
    private http: HttpClient,
    private jwt: JwtTokenService,
    private infoModal: InfoModalService
    ) {
  }

  logInUserLocal(e){
    localStorage.setItem('ZG9udERlY29kZUl0', "ZnVubnRDb2Rl");
    this.jwt.setJwtToken(e);
    this.setSessionExp();
    this.setIfIsLoggedIn();
  }
  sendloginReq(e,p):any{
    return this.http.post<any>(this.url1, {email:e, password:p
    }, httpOptions).pipe(map(
      res => {return res},
      ));
  }

  loggOutUser(){
    localStorage.setItem('ZG9udERlY29kZUl0', "aWR1bm5v");
    this.delSessionExp();
    this.setIfIsLoggedIn();
  }

  getLoggedUser():string{
    return localStorage.getItem('ZG9udERlY29kZUl0');
  }

  setIfIsLoggedIn():void{
    if(this.getLoggedUser()==='ZnVubnRDb2Rl'){
      this.isLoggedIn.next(true)
    }
    else{
      this.isLoggedIn.next(false)
    }
  }

  checkExpDate(){
    let expDate = this.getSessionExp();
    let currDate:number = new Date().getTime();

    if(currDate > expDate){
      this.loggOutUser();
    }
    else this.setIfIsLoggedIn();
  }

  checkIfCurrentLogged(){
    if(this.getLoggedUser()==='ZnVubnRDb2Rl'){
      this.setSessionExp();
    }
  }

  setSessionExp(){
    const fiveHours = 18000000;
    const currDate = new Date();
    let expDate:string = stringify(currDate.getTime()+ fiveHours);
    localStorage.setItem('bm9Ob1VEb250', expDate);
  }

  getSessionExp():number{
    return parseInt(localStorage.getItem('bm9Ob1VEb250'));
  }

  delSessionExp(){
    localStorage.setItem('bm9Ob1VEb250', "0");
    this.jwt.delJwtToken();
  }


  getAllCat(){
    this.http.get(this.url2, this.httpOptions2).subscribe(
      res => '',
      err => console.warn(err),
      () => ''
    );
  }
}
