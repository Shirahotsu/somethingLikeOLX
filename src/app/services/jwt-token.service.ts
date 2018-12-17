import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() {
    this.decodeToken()
  }
  setJwtToken(e){
    localStorage.setItem('2ZG9udERlYUl09kZ', e);
  }
  getJwtToken():string{
    return localStorage.getItem('2ZG9udERlYUl09kZ')
  }
  delJwtToken(){
    localStorage.setItem('2ZG9udERlYUl09kZ', '2ZG9udERlYUl09kZ');
  }
  decodeToken(){
    const token = this.getJwtToken();
    console.log(token);

    if(token !== 'aWR1bm5v'){
      // console.log(jwt_decode(token));
    }

  }
}
