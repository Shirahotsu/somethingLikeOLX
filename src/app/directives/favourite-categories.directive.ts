import { Directive, ElementRef, Input, Renderer2, OnInit, ViewChild } from '@angular/core';
import {Observable, fromEvent} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CheckFavCatService } from '@services/check-fav-cat.service';

@Directive({
  selector: '[appFavCat]'
})
export class FavouriteCategoriesDirective {
  @Input() appInCat: string;
  public allCatNum: number[];
  public firstCat: number;
  public secondCat: number;
  public allCats: any[];

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2,
    private cookieService: CookieService,
    private favCat: CheckFavCatService
    ) {
  }

  ngOnInit() {
  let date = new Date();
  this.allCats = JSON.parse(this.favCat.getCookieData());
  const el = document.getElementById('xdelo');
  const click$ = fromEvent(this.elem.nativeElement, 'click');
  click$.subscribe((event) => {

    switch(this.appInCat) {
      case this.allCats[0].name:
        this.allCats[0].number++;
        this.favCat.sendCookieData(  this.allCats);
          break;
      case this.allCats[1].name:
        this.allCats[1].number++;
        this.favCat.sendCookieData(  this.allCats);
          break;
      case this.allCats[2].name:
        this.allCats[2].number++;
        this.favCat.sendCookieData(  this.allCats);
          break;
      default:
      console.log('err');
  }
  console.log(this.allCats);
  console.log(this.appInCat);

  });
}
checkTowMaxVal(){
}
}
