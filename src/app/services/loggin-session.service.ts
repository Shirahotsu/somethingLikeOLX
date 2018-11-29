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
  // test
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
      console.log(this.jwt.getJwtToken());
  }

  logInUserLocal(e){
    localStorage.setItem('ZG9udERlY29kZUl0', "ZnVubnRDb2Rl");
    this.jwt.setJwtToken(e);
    this.setSessionExp();
    this.setIsLoggedIn();
  }
  sendloginReq(e,p):any{
    return this.http.post<any>(this.url1, {email:e, password:p
    }, httpOptions).pipe(map(
      res => {return res},
      error => this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej')
      ));
  }

  loggOutUser(){
    localStorage.setItem('ZG9udERlY29kZUl0', "aWR1bm5v");
    this.delSessionExp();
    this.setIsLoggedIn();
  }

  getLoggedUser():string{
    return localStorage.getItem('ZG9udERlY29kZUl0');
  }

  setIsLoggedIn():void{
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
  }

  checkIfCurrentLogged(){
    if(this.getLoggedUser()==='ZnVubnRDb2Rl'){
      this.setSessionExp();
    }
  }

  setSessionExp(){
    const sixHours = 21600000;
    const currDate = new Date();
    let expDate:string = stringify(currDate.getTime()+ sixHours);
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
      res => console.log(res),
      err => console.warn(err),
      () => console.log('yay')
    );
  }
}
