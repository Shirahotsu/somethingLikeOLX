import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { stringify } from '@angular/compiler/src/util';

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

  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  url:string = 'http://192.168.0.4:8090/logout';
  url2:string = 'http://25.39.174.175:8090/logout';
  date:Date;
  constructor(private http: HttpClient) {
  }

  loggInUser(){
    localStorage.setItem('ZG9udERlY29kZUl0', "ZnVubnRDb2Rl");
    this.setSessionExp();
    this.setIsLoggedIn();
  }

  loggOutUser(){
    this.logout().subscribe(
      res=> console.log(res)
    )
    localStorage.setItem('ZG9udERlY29kZUl0', "aWR1bm5v");
    this.delSessionExp();
    this.setIsLoggedIn();
  }

  getLoggedUser(){
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

  logout():any{
    return this.http.post<any>(this.url2, {
    }, httpOptions).pipe(map(res => {return res}));
  }

  checkExpDate(){
    let expDate = this.getSessionExp();
    let currDate:number = new Date().getTime();
    if(currDate > expDate){
      this.loggOutUser();
    }
    else this.loggInUser();
  }

  checkIfCurrentLogged(){
    if(this.getLoggedUser()==='ZnVubnRDb2Rl'){
      this.setSessionExp();
    }
  }

  setSessionExp(){
    const currDate = new Date();
    let expDate:string = stringify(currDate.getTime()+ 1800000);
    localStorage.setItem('bm9Ob1VEb250', expDate);
  }

  getSessionExp():number{
    return parseInt(localStorage.getItem('bm9Ob1VEb250'));
  }

  delSessionExp(){
    localStorage.setItem('bm9Ob1VEb250', "0");
  }
}
