import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecemoendedCategoriesService {
  url:string = 'http://192.168.0.4:8090/rest/product/get';
  constructor(private http:HttpClient) { }


  getRecomendedCategories(id:number, prodId:number){
    return this.http.get(`${this.url}/${id}/4/${prodId}`).pipe(map(
      res => {return res}
    ));
  }
}
