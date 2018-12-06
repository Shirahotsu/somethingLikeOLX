import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string = 'http://192.168.0.4:8090/rest/category/allCategories';
  categories:any;
  constructor(
    private http: HttpClient
  ) {
  }

  getAllCategories(){
    return this.http.get(this.url).pipe(map(
      res => {return res}
    ));
  }

  getCatIdFromName(categoryName:string){
    let catId:number;
    return this.http.get(this.url).pipe(map(
      res => {
        this.categories = res,
        this.categories.forEach(element => {
          if(element.category_name === categoryName){
            catId = element.category_id
          }
        });
        return catId;
      }
    ));

    // console.log(catId);
  }

  setCategoriesToVar(){

  }

}
