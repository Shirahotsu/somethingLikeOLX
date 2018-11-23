import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  public url:string;
  constructor(private http: HttpClient) {
    this.url = "http://25.39.174.175:8090/rest/";
    // this.url = "../../assets/data/data.json";
  }
  getCategories(){
    return this.http.get(this.url+"categories");
  }
  getCategoryProducst(e){
    return this.http.get(this.url+"allProductsByCategory/"+e);
  }
  getPtroductList(e){
    return this.http.get(this.url+"search/"+e);
  }
  getXProducts(howMuch ,category){
    return this.http.get(this.url+"products/"+howMuch+"/"+category);
  }
  getLocalData():Observable<any>{
    return this.http.get("./assets/products.json");
  }
}
