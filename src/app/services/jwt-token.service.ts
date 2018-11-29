import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }
  setJwtToken(e){
    localStorage.setItem('2ZG9udERlYUl09kZ', e);
  }
  getJwtToken():string{
    return localStorage.getItem('2ZG9udERlYUl09kZ')
  }
  delJwtToken(){
    localStorage.setItem('2ZG9udERlYUl09kZ', '0');
  }
}
