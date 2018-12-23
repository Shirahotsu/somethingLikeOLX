import { Injectable , OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FavCat } from '@models/favCat.model';

@Injectable({
  providedIn: 'root'
})
export class CheckFavCatService {

  public cookieData:FavCat[];
  public firstCat: number;
  public secondCat: number;
  public allCatNum: number[];
  public secondNum: number;
  public allCats: any[];

  constructor( private cookieService: CookieService) {
    this.allCats = [
      {
        name:'3',
        number: 0
      },
      {
        name:'2',
        number: 0
      },
      {
        name:'1',
        number: 0
      },
      {
        name:'4',
        number: 0
      }
    ]
  }

  getCookieData(){
    if(this.cookieService.get('favCat') === "" || this.cookieService.get('favCat') === "undefind"){
      let jsonn = JSON.stringify(this.allCats);
      this.cookieService.set( 'favCat', jsonn, 7 );
    }
    return this.cookieService.get('favCat');
  }
  sendCookieData(e){
    e = JSON.stringify(e);
    this.cookieService.set( 'favCat', e, 7 );
  }
  checkCookieData():number {
    this.allCatNum = new Array;

      this.cookieData = JSON.parse(this.getCookieData());
      this.cookieData.forEach(e => {
        this.allCatNum.push( e.number);
      });

      this.firstCat = this.allCatNum.indexOf(Math.max(...this.allCatNum));
      this.allCatNum.splice(this.firstCat,1, 0);
      this.secondCat = this.allCatNum.indexOf(Math.max(...this.allCatNum));
      this.secondNum = Math.max(...this.allCatNum);

      if(this.cookieData[this.firstCat].number === 0 && this.cookieData[this.secondCat].number === 0){
        return 0
      }
      else if(this.cookieData[this.firstCat].number !== 0 && this.secondNum === 0){
        return 1
      }
      else{
        return 2
      }
  }
  getFavCat(){
    let allCatNum2 = new Array;
      let cookieData = JSON.parse(this.getCookieData());
      cookieData.forEach(e => {
        allCatNum2.push( e.number);
      });

    let data2 = JSON.parse(this.getCookieData());
    let firstCat = allCatNum2.indexOf(Math.max(...allCatNum2));
    allCatNum2.splice(this.firstCat,1, 0);
    let secondCat = allCatNum2.indexOf(Math.max(...allCatNum2));
    let finalData = [data2[firstCat].name,data2[secondCat].name];
    return finalData;
  }
}
