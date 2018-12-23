import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersProductsService {
  url:string = 'http://192.168.0.4:8090/rest/product/getProducts/';
  userId:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  userID: number;
  constructor(
    private http:HttpClient
  ) { }
  getUsersProducts(){
    return this.getUserId().pipe(map(
      res => {
        this.userID = res;
        return this.http.get(this.url+this.userID).pipe(map(
          res => {return res}
        ));
      }
    ));
  }
  setUserId(userId:number){
    this.userId.next(userId);
  }
  getUserId(){
    return this.userId.pipe(map(
      res => {return res}
    ));
  }
}
